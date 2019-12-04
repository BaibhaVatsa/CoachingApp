// Shows the rendered HTML output depending on what the used chose from the ChooseIntent component.
// Allows editing of the contents to customise the outgoing email.
import React from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

type EmailBodyProps = {
    intent: string;
}

export class EmailBody extends React.Component<EmailBodyProps, {}> {
    render() {
        return (
            <div>
                {this.renderBody()}
            </div>
        );
    }
    renderBody = () => {
        const intent = this.props.intent;
        if (intent === "") {
            return <h1>Choose intent</h1>;
        } else if (intent === "custom") {
            return <h2>Woohoo! Custom content!</h2>;
        } else if (intent === "thank_you") {
            return <h2>Thank you!</h2>;
        } else if (intent === "action_plan") {
            return <h2>Action Plan!</h2>;
        } else if (intent === "schedule_meeting") {
            return <h2>Let's meet!</h2>;
        } else {
            return <h2>WTF</h2>;
        }
    }
}