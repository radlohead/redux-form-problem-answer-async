import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { fetchSubmit } from '../actions';
import { Answer, Problem, Footer } from '../components';
import '../css/containers/App.scss';

class App extends Component {
	handleSubmit(e) {
		e.preventDefault();
		const { form, onFetchSubmit } = this.props;
		let result = [];
		// if(!form.Problem.values) return;
		// Object.entries(form.Problem.values).forEach(v => {
		// 	result.push({answer: Object.values(v)[1]});
		// });
		onFetchSubmit(result);
		console.log(result);
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