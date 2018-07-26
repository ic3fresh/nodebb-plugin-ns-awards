import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../../model/constants';

import {
    addUserForGrant,
    highlightUser,
    pickAward,
    resetUsername,
    rewardUsers,
    searchUser,
    setGrantReason,
    setUsername,
    setUserSearchFocus
} from '../../action/actions';
import AwardPicker from '../display/award-picker';
import isAwardGrantValid from '../../model/selector/is-award-grant-valid';
import PanelControls from '../display/panel-controls';
import {
    getAwards,
    getAwardForGrant,
    getGrantReason,
    getUserHighlight,
    getUsername,
    getUsers,
    isUserSearchFocused
} from '../../model/selector/selectors';
import UserSearch from '../display/user-search';
import SectionLoading from '../display/section-loading';
import UserSelectList from './user-select-list';

class Rewarding extends React.Component {
    render() {
        if (this.props.awards === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="rewarding">
                <div className="rewarding__awards">
                    <h5>Wybierz nagrodę:</h5>
                    <AwardPicker
                        awardForGrant={this.props.awardForGrant}
                        awards={this.props.awards}
                        itemDidSelect={award => this.props.selectAward(award)}/>
                </div>
                <div className="rewarding__details">
                    <h5>Wybierz użytkowników:</h5>
                    <UserSearch
                        focus={this.props.userSearchFocused}
                        focusDidChange={state => this.props.setFocus(state)}
                        highlight={this.props.userHighlight}
                        optionDidSelect={option => this.props.select(option)}
                        options={this.props.users}
                        placeholder="Wpisz nazwę użytkownika"
                        selectionWillChange={direction => this.props.highlight(direction)}
                        value={this.props.username}
                        valueDidChange={text => this.props.changeUsername(text)}
                        valueWillReset={() => this.props.resetUsername()}/>
                    <UserSelectList/>
                    <div className="form-group rewarding__reason">
                        <label htmlFor="grantReason">Powód</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            id="grantReason"
                            placeholder="Wpisz powód. Tekst będzie wyświetlany publicznie, a jego edycja nie będzie możliwa."
                            onChange={e => this.props.setReason(e.target.value)}
                            value={this.props.grantReason || ''}/>
                    </div>
                    <PanelControls
                        disableCancel={true}
                        labelSuccess="Nagródź"
                        valid={this.props.awardGrantValid}
                        successDidClick={() => this.props.grant()}/>
                </div>
            </div>
        );
    }
}

Rewarding.propTypes = {
    awardForGrant    : PropTypes.object,
    awardGrantValid  : PropTypes.bool,
    awards           : PropTypes.array,
    changeUsername   : PropTypes.func,
    grant            : PropTypes.func,
    grantReason      : PropTypes.string,
    highlight        : PropTypes.func,
    resetUsername    : PropTypes.func,
    select           : PropTypes.func,
    selectAward      : PropTypes.func,
    setFocus         : PropTypes.func,
    setReason        : PropTypes.func,
    userHighlight    : PropTypes.object,
    username         : PropTypes.string,
    users            : PropTypes.array,
    userSearchFocused: PropTypes.bool
};

export default connect(
    () => {
        let selectAwardGrantValid = isAwardGrantValid();
        return state => {
            return {
                awardForGrant    : getAwardForGrant(state),
                awardGrantValid  : selectAwardGrantValid(state),
                awards           : getAwards(state),
                grantReason      : getGrantReason(state),
                userHighlight    : getUserHighlight(state),
                username         : getUsername(state),
                users            : getUsers(state),
                userSearchFocused: isUserSearchFocused(state)
            };
        };
    },
    dispatch => {
        let debounceSearch = debounce(() => dispatch(searchUser()), Constants.SEARCH_DEBOUNCE_DELAY);
        return {
            changeUsername: text => {
                dispatch(setUsername(text));
                debounceSearch();
            },
            grant         : () => dispatch(rewardUsers()),
            highlight     : direction => dispatch(highlightUser(direction)),
            resetUsername : () => dispatch(resetUsername()),
            select        : user => dispatch(addUserForGrant(user)),
            selectAward   : award => dispatch(pickAward(award)),
            setFocus      : state => dispatch(setUserSearchFocus(state)),
            setReason     : value => dispatch(setGrantReason(value))
        };
    }
)(Rewarding);
