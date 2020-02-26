import React, { Component } from 'react';
import styled from 'styled-components';
import { CounterTypes } from "../constants/constants.js";
import { faPlusCircle, faMinusCircle, faBed, faUsers, faUser, faChild } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomSelectionContainer = styled.div`
	margin-top: 10px;
	border: 1px solid #000;
	padding: 15px;

	> div {
		margin: 10px 0;
		border: 1px solid #000;
		padding: 15px;
		display: flex;
    	justify-content: space-between;
	}

	svg {
		margin: 0 5px;
	}
`;		

class RoomSelectionDashboard extends Component {
	constructor() {
		super();
		this.state = {
			rooms: 1,
			adults: 1,
			children: 0
		};
	}

	enabledStatus = (element, type) => {
		const { rooms, adults, children } = this.state;
		if (element === "rooms") {
			if(type === "increment") {
				return rooms < 5;
			} else {
				return rooms > 1;
			}
		} else if(element === "adults") {
			if(type === "increment") {
				return (rooms * 4 > (adults + children));
			} else {
				return adults > 1	;
			}
		} else if(element === "children") {
			if(type === "increment") {
				return (rooms * 4 > (adults + children));
			} else {
				return children > 0;
			}
		}
		return false;
	}

	render() {
		const { rooms, adults, children } = this.state;
		return(
			<RoomSelectionContainer>
				<span>
					<FontAwesomeIcon icon={faUsers} /> Choose number of <strong>people</strong>
				</span>
				<React.Fragment> 
				{
					CounterTypes.map((type) => {
						return (
							<div 
								key={type.key}
							>
								<div>
									<span>
										<FontAwesomeIcon icon={type.value === "ROOMS" ? faBed : type.value === "ADULTS" ? faUser : faChild } />
									</span>
									<span>{type.value}</span>
								</div>
								<div>
									<FontAwesomeIcon
										id={type.value}
										icon={faMinusCircle}
										onClick={(e) => {
											let element = e.target.id !== "" ? e.target.id.toLowerCase() : e.target.parentElement.id.toLowerCase();
											const canUpdateState = this.enabledStatus(element, "decrement");
											if(canUpdateState) {
												if(element === "rooms") {
													if (((rooms-1) * 4) < (adults + children)) {
														let newChildrenValue = children, newAdultValue = adults;
														do {
															if(newChildrenValue === 0) {
																newAdultValue--;
															} else {
																newChildrenValue--;
															}
														} while(((rooms-1) * 4) < (newChildrenValue + newAdultValue));
														this.setState({
															[element]: this.state[element] - 1,
															adults: newAdultValue,
															children: newChildrenValue
														});
													} else {
														this.setState({
															[element]: this.state[element] - 1
														});
													}
												} else {
													this.setState({
														[element]: this.state[element] - 1
													});
												}
											}
										}}
									/>
									<span>{this.state[type.key]}</span>	
									<FontAwesomeIcon 
										icon={faPlusCircle} 
										id={type.value}
										onClick={(e) => {
											let element = e.target.id !== "" ? e.target.id.toLowerCase() : e.target.parentElement.id.toLowerCase();
											const canUpdateState = this.enabledStatus(element, "increment");
											if(canUpdateState) {
												if(element === "rooms") {
													this.setState({
														[element]: this.state[element] + 1,
														"adults": this.state.adults + 1
													});
												} else {
													this.setState({
														[element]: this.state[element] + 1
													});
												}
											}
										}}
									/>
								</div>
							</div>
					)})
				}
				</React.Fragment> 
			</RoomSelectionContainer>
		)
	}
}

export default RoomSelectionDashboard;