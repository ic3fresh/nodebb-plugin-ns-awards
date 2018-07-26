import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../../model/constants';
import {
    changeUserForInspect,
    highlightUser,
    pickAward,
    resetUsername,
    rewardUsers,
    searchUser,
    setGrantReason,
    setUsername,
    setUserSearchFocus
} from '../../action/actions';
import Avatar from '../display/avatar';
import GrantsList from './grants-list';
import {
    getUserHighlight,
    getUserInspect,
    getUsername,
    getUsers,
    isUserSearchFocused
} from '../../model/selector/selectors';
import UserDetails from '../display/user-details';
import UserSearch from '../display/user-search';

class Management extends React.Component {
    render() {
        return (
            <div className="management">
                <p className="section-hint">
                    Zarządzaj wszystkimi odznakami otrzymanymi przez użytkownika.
                </p>
                <h5>Wybierz użytkownika:</h5>
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
                {this.props.userInspect !== null ? this.renderSearchResult(this.props.userInspect) : null}
            </div>
        );
    }

    renderSearchResult(user) {
        return (
            <div className="management__user">
                <div className="management__details">
                    <div className="management__avatar">
                        <Avatar size="big" user={user}/>
                    </div>
                    <UserDetails user={user}/>
                </div>
                <div className="management__grants">
                    <GrantsList/>
                </div>
            </div>
        );
    }
}

Management.propTypes = {
    changeUsername   : PropTypes.func,
    highlight        : PropTypes.func,
    resetUsername    : PropTypes.func,
    select           : PropTypes.func,
    setFocus         : PropTypes.func,
    userHighlight    : PropTypes.object,
    userInspect      : PropTypes.object,
    username         : PropTypes.string,
    users            : PropTypes.array,
    userSearchFocused: PropTypes.bool
};

export default connect(
    state => {
        return {
            userHighlight    : getUserHighlight(state),
            userInspect      : getUserInspect(state),
            username         : getUsername(state),
            users            : getUsers(state),
            userSearchFocused: isUserSearchFocused(state)
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
            select        : user => dispatch(changeUserForInspect(user)),
            selectAward   : award => dispatch(pickAward(award)),
            setFocus      : state => dispatch(setUserSearchFocus(state)),
            setReason     : value => dispatch(setGrantReason(value))
        };
    }
)(Management);
