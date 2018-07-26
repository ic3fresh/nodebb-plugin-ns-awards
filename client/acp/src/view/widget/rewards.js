import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {getAwardGrants} from '../../action/actions';
import Grant from '../display/grant';
import SectionLoading from '../display/section-loading';
import {getGrants} from '../../model/selector/selectors';

class Rewards extends React.Component {
    componentDidMount() {
        this.props.getGrants();
    }

    render() {
        if (this.props.grants === null) {
            return <SectionLoading/>;
        }

        if (this.props.grants.length === 0) {
            return (
                <span
                    className="empty-section-message">Sekcja jest pusta. Tu pojawią się rozdane nagrody.
            </span>
            );
        }

        return (
            <div className="rewards">
                {this.props.grants.map(grant => {
                    return <Grant key={grant.gid} grant={grant}/>;
                })}
            </div>
        );
    }
}

Rewards.propTypes = {
    getGrants: PropTypes.func,
    grants   : PropTypes.array
};

export default connect(
    state => {
        return {
            grants: getGrants(state)
        };
    },
    dispatch => {
        return {
            getGrants: () => dispatch(getAwardGrants())
        };
    }
)(Rewards);
