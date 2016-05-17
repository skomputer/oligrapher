import React, { Component, PropTypes } from 'react';

export default class ShowHideAnnotations extends Component {

	render() {
		return (
			<div id="oligrapherToggleAnnotationButton">
				<div style={{ float: "left" }}>
					<button
						id="oligrapherHideAnnotationsButton"
						className="btn btn-lg btn-default"
						onClick={() => this.props.swapAnnotations()}>
						<span className="glyphicon glyphicon-font"></span>
					</button>
				</div>
			</div>
		)
	}

}