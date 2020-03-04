import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAnswer, correctAnswers, setErrors } from './Redux';
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            responses: {},
            errors: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // fetch initial questions and options and set them in localstate to display in the UI
        fetch('data/data.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Response not OK');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({ questions: data })
            })
            .catch((error) => {
                console.error('Some issue with the fetch:', error);
            });
    }

    handleChange(response, e) {

        // pick up the answer selected to a question coming from the radio buttons,
        // and dispatch to redux store
        let responses = this.state.responses;
        responses[response] = e.target.value;
        this.props.changeAnswer(responses)
    }

    handleSubmit(e) {

        // do another call to receive the answers to questions from a different source
        // set the correct answers to the redux store, and then call a validator function,
        // which if a proper serverside validator, would live away from the frontend 
        // and return just which fields dont have a correct answer, instead of worrying about
        // the correct values in the frontend
        e.preventDefault();
        fetch('data/answers.json')
            .then(response => response.json())
            .then(answers => this.props.correctAnswers(answers))
            .then(() => this.handleValidation())
    }

    handleValidation() {

        // this validation should happen on the serverside code, and to mock that, I'm doing that here
        // and then this function that makes the serverside call would return whatever errors you have
        // passed on to the redux store and then updating the UI

        let responses = this.props.state.mainReducer
        let correct = this.props.state.mainReducer.answers
        let errors = {};

        // this could be prettier and inside a loop, but hardcoded for simplicity
        if (responses["1"] !== correct[0].correct) {
            errors["1"] = "WRONG";
        }

        if (responses["2"] !== correct[1].correct) {
            errors["2"] = "WRONG";
        }

        if (responses["3"] !== correct[2].correct) {
            errors["3"] = "WRONG";
        }

        // dispatch an action to set errors object in redux store
        this.props.setErrors({ errors: errors })
    }

    render() {
        const questions = this.state.questions.questions
        return (
            <div className="quiz-wrapper">
                <form name="quiz" className="quiz" onSubmit={this.handleSubmit}>
                    {
                        questions && questions.map(question => (
                            <div>
                                <h3>{question.question}</h3>

                                <input name={question.id} ref={question.id} type="radio" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option} />
                                <label for="choiceOne">{question.option}</label>

                                <input name={question.id} ref={question.id} className="second-q" type="radio" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option2} />
                                <label for="choiceTwo">{question.option2}</label>
                                {this.props.state.mainReducer.errors && <span className="error">{this.props.state.mainReducer.errors[`${question.id}`]}</span>}
                            </div>
                        ))
                    }
                    <button value="Submit">check</button>
                </form>
            </div>
        )
    }
}

// add container stuff instead of making it to a separate file

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = {
    changeAnswer,
    correctAnswers,
    setErrors
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
