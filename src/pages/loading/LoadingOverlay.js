import React from "react";
import styled from "styled-components";
import { connect } from "react-redux"; import {
	Dialog,
	CircularProgress
} from "@material-ui/core";

import {
	reset_loading_overlay
} from "../../redux/reducers/loadingOverlayReducer";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

class LoadingOverlay extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { ongoingRequests } = this.props;
		return (
			<div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
				{ongoingRequests && (
					<Dialog
						open={ongoingRequests}
						PaperProps={{
							style: {
							  backgroundColor: 'transparent',
							  boxShadow: 'none',
							},
						  }}
					>
						<Root>
							<CircularProgress m={2} color="primary" />
						</Root>
					</Dialog>
				)
				}
			</div>
		);
	}
}


const mapStateToProps = state => ({
	ongoingRequests: state.loadingOverlayReducer.ongoingRequests,
});

const mapDispatchToProps = dispatch => ({
	actions: {
		resetLoadingOverlay: () => { dispatch(reset_loading_overlay()); }
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingOverlay);
