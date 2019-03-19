import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { CHOICES, DEFAULT_VALUE, fetchSubmit } from '../actions';
import { Answer, Problem, Footer } from '../components';
import '../css/containers/App.scss';

class App extends Component {
	handleSubmit(e) {
		e.preventDefault();
		const { problemJSON, form, onFetchSubmit } = this.props;
		const problemLength = problemJSON.problems.length;
		let result = [];

		if(!form.Problem.values) form.Problem.values = {};
		if(Object.entries(form.Problem.values).length < problemLength) {
			const obj = Object.entries(form.Problem.values);
			const findId = obj.map(v => v[0].replace(`${CHOICES}_`, ''));
			const idList = Array(problemLength).fill(null).map((v, i) => i + 1);
			const findNotId = [...new Set(idList)].filter(v => !(new Set(findId)).has(v.toString()));

			findNotId.forEach(v => {
				form.Problem.values[`${CHOICES}_${v}`] = DEFAULT_VALUE;
			});
		}
		Object.entries(form.Problem.values).forEach(v => {
			result.push({answer: Object.values(v)[1]});
		});
		
		onFetchSubmit(result);
	}
	
	render() {
		return (
			<>
			<form className="wrapper" onSubmit={this.handleSubmit.bind(this)}>
				<section className="main">
					<Problem />
					<Answer />
				</section>
				<Footer />
			</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
    return {
		problemJSON: state.problem.problemJSON,
		submitJSON: state.submitJSON,
		form: state.form
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchSubmit: bindActionCreators(fetchSubmit, dispatch)
    }
}

const decoratedComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default reduxForm({
	form: 'Problem'
})(decoratedComponent);