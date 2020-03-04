import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { changeAnswer, correctAnswers } from './Redux';

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
        fetch('data/data.json')
            .then(response => response.json())
            .then(data => this.setState({ questions: data }));
    }

    handleChange(response, e) {
        let responses = this.state.responses;
        responses[response] = e.target.value;
        this.setState({ responses });
        this.props.changeAnswer(responses)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('this.props in submit', this.props)
        fetch('data/answers.json')
            .then(response => response.json())
            .then(answers => this.props.correctAnswers(answers))

        this.handleValidation()
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
        this.setState({ errors: errors });
    }

    render() {
        const questions = this.state.questions.questions
        console.log("render this.props", this.props)
        return (
            <div>
                <form name="quiz" className="quiz" onSubmit={this.handleSubmit}>
                    {
                        questions && questions.map(question => (
                            <div>
                                <h3>{question.question}</h3>

                                <input name={question.id} ref={question.id} type="radio" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option} />
                                <label for="choiceOne">{question.option}</label>

                                <input name={question.id} ref={question.id} type="radio" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option2} />
                                <label for="choiceTwo">{question.option2}</label>
                                <span className="error">{this.state.errors[`${question.id}`]}</span>
                            </div>
                        ))
                    }
                    <button value="Submit">check</button>
                </form>
            </div>
        )
    }
}

// container stuff

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = {
    changeAnswer,
    correctAnswers,
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
