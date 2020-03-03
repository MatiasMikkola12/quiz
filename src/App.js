import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            fields: {},
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

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('data/answers.json')
            .then(response => response.json())
            .then(answers => this.handleValidation(answers))
    }

    handleValidation(answers) {
        let fields = this.state.fields;
        let errors = {};
        
        if (fields["1"] != answers.answers[0].correct) {
            errors["1"] = "WRONG";
        }

        if (fields["2"] != answers.answers[1].correct) {
            errors["2"] = "WRONG";
        }

        if (fields["3"] != answers.answers[2].correct) {
            errors["3"] = "WRONG";
        }

        console.log('errors', errors);
        this.setState({ errors: errors });
    }

    render() {
        const questions = this.state.questions.questions
        return (
            <div>
                <form name="contactform" className="contactform" onSubmit={this.handleSubmit}>
                    {
                        questions && questions.map(question => (
                            <div>
                                <h3>{question.question}</h3>

                                <input name={question.id} ref={question.id} type="radio" size="30" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option} />
                                <label for="contactChoice1">{question.option}</label>

                                <input name={question.id} ref={question.id} type="radio" size="30" onChange={this.handleChange.bind(this, `${question.id}`)} value={question.option2} />
                                <label for="contactChoice1">{question.option2}</label>
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



export default App;
