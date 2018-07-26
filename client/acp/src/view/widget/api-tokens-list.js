import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {createApiTokenWithPrompt, deleteApiToken} from '../../action/actions';
import RoundButton from '../display/round-button';
import {getApiTokens} from '../../model/selector/selectors';

class ApiTokensList extends React.Component {
    render() {
        return (
            <div className="api-tokens-list">
                <h5>Tokeny API</h5>
                <p>Oto lista tokenów API. Tokeny zapewniają innym wtyczkom dostęp do API odznak. 
                    Usuń tokeny, których nie rozpoznajesz.</p>
                <div>
                    <RoundButton
                        icon="fa-plus"
                        animate={false}
                        role="active"
                        clickListener={() => this.props.createToken()}/> Utwórz Token API...
                </div>
                <div className="api-tokens-list__body">
                    {this.props.apiTokens !== null && this.props.apiTokens.map(tokenData => {
                        return (
                            <div className="api-tokens-list__item" key={tokenData.id}>
                                <div className="api-tokens-list__item-name">
                                    {tokenData.name}
                                </div>
                                <div className="api-tokens-list__item-value">
                                    {tokenData.token}
                                </div>
                                <div className="api-tokens-list__item-controls">
                                    <RoundButton
                                        icon="fa-trash"
                                        animate={true}
                                        role="danger"
                                        clickListener={() => this.props.deleteToken(tokenData.id)}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

ApiTokensList.propTypes = {
    apiTokens  : PropTypes.array,
    createToken: PropTypes.func,
    deleteToken: PropTypes.func
};

export default connect(
    state => {
        return {
            apiTokens: getApiTokens(state)
        };
    },
    dispatch => {
        return {
            createToken: () => dispatch(createApiTokenWithPrompt()),
            deleteToken: id => dispatch(deleteApiToken(id))
        };
    }
)(ApiTokensList);
