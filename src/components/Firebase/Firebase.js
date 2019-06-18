import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
    authDomain: "cqrefpwa.firebaseapp.com",
    databaseURL: "https://cqrefpwa.firebaseio.com",
    projectId: "cqrefpwa",
    storageBucket: "cqrefpwa.appspot.com",
    messagingSenderId: "353838544707"
};


class Firebase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            this.db.settings({timestampsInSnapshots: true});
            this.db.enablePersistence({experimentalTabSynchronization:true}).then(() => {
              console.log("Woohoo! Multi-Tab Persistence!");
            }).catch((err=>{console.log("Offline Not Working")}));

            this.functions = firebase.functions();
        }
    }

    firebaseEmailSignUp = async function (userData, role) {
        console.log(role);
        console.log(userData);
        await this.auth
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(function (userInfo) {
                console.log("Create user and sign in Success", userInfo);
                var data = Object.assign(
                    {},
                    {
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: role,
                        id: userInfo.user.uid
                    }
                );

                firebase
                    .firestore()
                    .collection("users")
                    .doc(userInfo.user.uid)
                    .set(data)
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

                // firebase.database().ref('users/' + role +'/'+ userInfo.user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                //     console.log("Saved");
                //     return true;
                // }, function(error) {
                //     console.log(error);
                //     return false;
                // });
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + ":" + errorMessage);
                alert(errorMessage);
                return false;
            });
    };

    firebaseEmailSignIn = async function (userData, role) {
        console.log(role);
        console.log(userData);

        await this.auth
            .signInWithEmailAndPassword(userData.email, userData.password)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + ":" + errorMessage);
                alert(errorMessage);
                return errorMessage;
            });
    };

    firebaseSignOut = async function () {
        await this.auth
            .signOut()
            .then(function () {
                // Sign-out successful.
                console.log("Signed Out");
            })
            .catch(function (error) {
                // An error happened.
                console.log("Signed Out Unsuccessful");
            });
    };

    resetPassword = email => {
        return this.auth.sendPasswordResetEmail(email);
    };

    getTeacherList = function () {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .collection("partners")
            .get()
            .then(partners => {
                let teacherList = [];
                partners.forEach((partner) => {
                    console.log(partner.id, "=>", partner.data());
                    teacherList.push(this.getTeacherInfo(partner.id).then((doc => doc.data()))
                    );
                })
                return teacherList;
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };

    getTeacherInfo = async (partnerId) => {
        return await firebase.firestore().collection("users").doc(partnerId).get();
    };

    getCoachList = function () {
        return firebase
            .firestore()
            .collection("users")
            .where("role", "==", "coach")
            .get()
            .then(function (querySnapshot) {
                let teacherList = [];
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    teacherList.push(doc.data());
                });
                console.log(teacherList);
                return teacherList;
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };

    getCoachFirstName = function () {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .get()
            .then(function(doc) {
                    // Document was found in the cache. If no cached document exists,
                    // an error will be returned to the 'catch' block below.
                    console.log("Cached document data:", doc.data());
                    return doc.data().firstName;
                }).catch(function(error) {
                    console.log("Error getting cached document:", error);
                });
    };

    getAdminList = function () {
        return firebase
            .firestore()
            .collection("users")
            .where("role", "==", "admin")
            .get()
            .then(function (querySnapshot) {
                let teacherList = [];
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    teacherList.push(doc.data());
                });
                console.log(teacherList);
                return teacherList;
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };

    sessionRef;

    handleSession = async mEntry => {
        this.sessionRef = this.db.collection("observations").doc();
        this.sessionRef.set({
            observedBy: "/user/" + mEntry.observedBy,
            start: firebase.firestore.FieldValue.serverTimestamp(),
            teacher: "/user/" + mEntry.teacher,
            end: firebase.firestore.FieldValue.serverTimestamp(),
            type: mEntry.type
        });
    };

    endSession = async () => {
        this.sessionRef.update({
            end: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    helloWorld = async () => {
        alert("Hello World!!");
    };

    handlePushAC = async mEntry => {
        const userRef = this.sessionRef.collection("entries").add({
            Checked: mEntry.checked.slice(1),
            PeopleType: mEntry.people,
            acType: mEntry.type,
            Timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    handlePushSequential = async mEntry => {
        const userRef = this.sessionRef.collection("entries").add({
            Checked: mEntry.checked.slice(1),
            PeopleType: mEntry.people,
            seqType: mEntry.type,
            Timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    handleUnlockSection = async section => {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .update({
                unlocked: firebase.firestore.FieldValue.arrayUnion(section)
            });
    };

    getUnlockedSections = async () => {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .get()
            .then(function(doc) {
                // Document was found in the cache. If no cached document exists,
                // an error will be returned to the 'catch' block below.
                console.log("Cached document data:", doc.data());
                console.log(doc.data());

                if (doc.data().unlocked === undefined) {
                    console.log("test", doc.data());
                    return [];
                } else {
                    return doc.data().unlocked;
                }

                //return doc.data().unlocked;

            }).catch(function(error) {
                console.log("Error getting cached document:", error);
            });
    };

    handlePushTransition = async mEntry => {
        const userRef = this.sessionRef.collection("entries").add({
            TrnStart: mEntry.start,
            TrnEnd: mEntry.end,
            TrnDur: mEntry.duration,
            TrnType: mEntry.transitionType,
            Timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    handlePushClimate = async mEntry => {
        const userRef = this.sessionRef.collection("entries").add({
            BehaviorResponse: mEntry.BehaviorResponse,
            Type: mEntry.Type,
            Timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    };

    handlePushNotes = async mNote => {
        const noteRef = this.sessionRef.collection("notes").add({
            Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            Note: mNote
        });
    };

    handleFetchNotes = async () => {
        return this.sessionRef.collection("notes")
            .get()
            .then(function (querySnapshot) {
                let notesArr = [];
                querySnapshot.forEach(function (doc) {
                    //console.log("doc data: ", doc.data());
                    // doc.data() is never undefined for query doc snapshots
                    notesArr.push({id: doc.id, content: doc.data().Note, timestamp: doc.data().Timestamp});
                });
                //console.log("Logging firebase notesArr: ", notesArr);
                return notesArr;
            });
    };

    handleFetchTrainingStatus = async () => {
        return firebase
            .firestore()
            .collection("users")
            .doc(this.auth.currentUser.uid)
            .get()
            .then(function(doc) {
                // Document was found in the cache. If no cached document exists,
                // an error will be returned to the 'catch' block below.
                console.log("Cached document data:", doc.data().training);
                return doc.data().training;
            }).catch(function(error) {
                console.log("Error getting cached document:", error);
            });
    };

    handleFetchQuestions = async (section) => {
        return firebase
            .firestore()
            .collection("questionbank")
            .doc(section)
            .collection("questions")
            .get()
            .then(questions => {
                let questionList = [];
                questions.forEach((question) => {
                    console.log(question.id, "=>", question.data());
                    questionList.push(question.data());
                })
                console.log(questionList)
                return questionList;
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };



    handleFetchNotesResults = async (sessionId) => {
        this.sessionRef = this.db.collection("observations").doc(sessionId);
        return this.sessionRef.collection("notes")
            .get()
            .then(function (querySnapshot) {
                let notesArr = [];
                querySnapshot.forEach(function (doc) {
                    //console.log("doc data: ", doc.data());
                    // doc.data() is never undefined for query doc snapshots
                    notesArr.push({id: doc.id, content: doc.data().Note, timestamp: doc.data().Timestamp});
                });
                //console.log("Logging firebase notesArr: ", notesArr);
                return notesArr;
            });
    };

    // fetchClimateSessionDates = async teacherId => {
    //     var getClimateSessionDatesFirebaseFunction = this.functions.httpsCallable('funcSessionDates');
    //
    //     return getClimateSessionDatesFirebaseFunction({teacherId: teacherId}).then(function (result) {
    //         // Read result of the Cloud Function.
    //         var sanitizedMessage = result.data[0];
    //         console.log(sanitizedMessage);
    //         return sanitizedMessage;
    //
    //     });
    //
    // };

    fetchAvgToneRating = async sessionId => {
        var getAvgToneRatingFirebaseFunction = this.functions.httpsCallable('funcAvgToneRating');

        return getAvgToneRatingFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;
        });

    };


    fetchBehaviourTypeCount = async sessionId => {
        var getBehaviourTypeCountFirebaseFunction = this.functions.httpsCallable('funcBehaviourTypeCount');

        return getBehaviourTypeCountFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;
        });

    };

    fetchBehaviourTrend = async teacherId => {
        var getBehaviourTrendFirebaseFunction = this.functions.httpsCallable('funcBehaviourTrend');

        return getBehaviourTrendFirebaseFunction({teacherId: teacherId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchSessionDates = async (teacherId, sessionType) => {
        var getTransitionSessionDatesFirebaseFunction = this.functions.httpsCallable('funcSessionDates');

        return getTransitionSessionDatesFirebaseFunction({
            teacherId: teacherId,
            type: sessionType
        }).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchTransitionSummary = async sessionId => {
        var getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable('funcTransitionOfSession');

        return getTransitionTypeCountFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;
        });

    };

    fetchTransitionLog = async sessionId => {
        var getTransitionsFirebaseFunction = this.functions.httpsCallable('funcTransitionLog');

        return getTransitionsFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;
        });

    };

    fetchTransitionTrend = async teacherId => {
        var getTransitionTrendFirebaseFunction = this.functions.httpsCallable('funcTransitionTrend');

        return getTransitionTrendFirebaseFunction({teacherId: teacherId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchACDetails = async sessionId => {
        var getACDetailsFirebaseFunction = this.functions.httpsCallable('funcACDetails');

        return getACDetailsFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchSeqDetails = async sessionId => {
        var getSeqDetailsFirebaseFunction = this.functions.httpsCallable('funcSeqDetails');

        return getSeqDetailsFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchChildACSummary = async sessionId => {
        var getChildACSummaryFirebaseFunction = this.functions.httpsCallable('funcChildACSummary');

        return getChildACSummaryFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchChildSeqSummary = async sessionId => {
        var getChildSeqSummaryFirebaseFunction = this.functions.httpsCallable('funcChildSeqSummary');

        return getChildSeqSummaryFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchTeacherACSummary = async sessionId => {
        var getTeacherACSummaryFirebaseFunction = this.functions.httpsCallable('funcTeacherACSummary');

        return getTeacherACSummaryFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchTeacherSeqSummary = async sessionId => {
        var getTeacherSeqSummaryFirebaseFunction = this.functions.httpsCallable('funcTeacherSeqSummary');

        return getTeacherSeqSummaryFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchChildACTrend = async teacherId => {
        var getChildACTrendFirebaseFunction = this.functions.httpsCallable('funcChildACTrend');

        return getChildACTrendFirebaseFunction({teacherId: teacherId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });
    };

    fetchChildSeqTrend = async teacherId => {
        var getChildSeqTrendFirebaseFunction = this.functions.httpsCallable('funcChildSeqTrend');

        return getChildSeqTrendFirebaseFunction({teacherId: teacherId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });
    };

    fetchTeacherACTrend = async sessionId => {
        var getTeacherACTrendFirebaseFunction = this.functions.httpsCallable('funcTeacherACTrend');

        return getTeacherACTrendFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };

    fetchTeacherSeqTrend = async sessionId => {
        var getTeacherSeqTrendFirebaseFunction = this.functions.httpsCallable('funcTeacherSeqTrend');

        return getTeacherSeqTrendFirebaseFunction({sessionId: sessionId}).then(function (result) {
            // Read result of the Cloud Function.
            var sanitizedMessage = result.data[0];
            console.log(sanitizedMessage);
            return sanitizedMessage;

        });

    };




}

export default Firebase;
