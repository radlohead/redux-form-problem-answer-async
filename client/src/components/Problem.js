import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProblem } from '../actions';
import '../css/components/Problem.scss';

const problemFormType = {
    1: 'RADIO',
    2: 'TEXT'
}

const RADIO = 'RADIO';
const TEXT = 'TEXT';
const CHOICES = 'CHOICES';
const ANSWER = 'ANSWER';

class Problem extends React.Component {
    constructor(props) {
        super(props);
        
        const { onFetchProblem } = this.props;
        onFetchProblem();
    }

    renderProblem() {
        const { problemJSON } = this.props;
        if (!problemJSON) return;

        return problemJSON.problems.map(v => {
            const { id, type, choices, answer } = v;

            return <section key={v.id} className="problem__box">
                <div className="problem__box__problem">
                    <span className="problem__box__id">{v.id}.</span>
                    <span className="problem__box__text">{v.problem_text}</span>
                </div>
                <div className="problem__box__answers">
                    <div className="problem__box__choices">{this.randerChoicesType(id, type, choices)}</div>
                    <div className="problem__box__answer">{this.renderAnswerType(id, type, choices, answer)}</div>
                </div>
            </section>
        })
    }

    renderAnswerFormRadio(id, choices, answer) {
        return JSON.parse(choices).map((v, i) => {
            const isChecked = i+1 === Number(answer);
            const nowId = Date.now() + Math.random();

            return <span key={nowId}>
                <input type="radio" name={`${ANSWER}_${id}`} value={v} readOnly checked={isChecked} />
                <label>{v}</label>
            </span>
        });
    }

    renderAnswerFormText(id, answer) {
        return <div>
            <input type="text" name={id} readOnly value={answer} />
        </div>
    }

    renderAnswerType(id, typeNum, choices, answer) {
        const choicesDeserialize = JSON.parse(choices);

        if (choicesDeserialize && problemFormType[typeNum] === RADIO) {
            return this.renderAnswerFormRadio(id, choices, answer);
        } else if (problemFormType[typeNum] === TEXT) {
            return this.renderAnswerFormText(id, answer);
        }
    }

    renderChoicesFormRadio(id, choices) {
        return JSON.parse(choices).map(v => {
            const nowId = Date.now() + Math.random();
            
            return <span key={nowId}>
                <input type="radio" name={`${CHOICES}_${id}`} value={v} />
                <label>{v}</label>
            </span>
        });
    }

    renderChoicesFormText(id) {
        return <div>
            <input type="text" name={id} />
        </div>
    }

    randerChoicesType(id, typeNum, choices) {
        const choicesDeserialize = JSON.parse(choices);

        if (choicesDeserialize && problemFormType[typeNum] === RADIO) {
            return this.renderChoicesFormRadio(id, choices);
        } else if (problemFormType[typeNum] === TEXT) {
            return this.renderChoicesFormText(id);
        }
    }

    render() {
        return (
            <section className="problems">
                {this.renderProblem()}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problemJSON: state.problem.problemJSON
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProblem: bindActionCreators(fetchProblem, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Problem);