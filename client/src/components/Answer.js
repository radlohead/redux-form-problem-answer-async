import React from 'react';
import { connect } from 'react-redux';
import '../css/components/Answer.scss';

class Answer extends React.Component {
    render() {
        const { submitJSON } = this.props;

        return (
            <aside className="answers">
                <h2>answer</h2>
                <ul>
                    {submitJSON.results.map(v => {
                        return <li key={v.id} className="answers__list">
                            <span className="answers__list__id">{v.id}.</span>
                            <span>{v.result ? 'O' : 'X'}</span>
                        </li>
                    })}
                </ul>
            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        submitJSON: state.problem.submitJSON
    }
}

export default connect(mapStateToProps)(Answer);