import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeSettingField, saveSettings} from '../../action/actions';
import ApiTokensList from './api-tokens-list';
import PanelControls from '../display/panel-controls';
import SectionLoading from '../display/section-loading';
import {getSettings} from '../../model/selector/selectors';
import * as SettingFields from '../../model/setting-fields';

class Settings extends React.Component {

    render() {
        if (this.props.settings === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="settings">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="maxRewardsPerAccount">Maksymalna liczba odznak na stronie profilu</label>
                            <input
                                className="form-control"
                                type="text"
                                id="maxRewardsPerAccount"
                                onChange={e => this.props.changeField(SettingFields.MAX_REWARDS_PER_ACCOUNT, e.target.value)}
                                value={this.props.settings[SettingFields.MAX_REWARDS_PER_ACCOUNT]}/>
                            <p className="help-block">Liczba odznak wyświetlana na stronie profilu. Wpisz -1, żeby usunąć limit, lub 0 żeby wyłączyć.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="maxRewardsPerPost">Maksymalna liczba odznak na stronie tematu</label>
                            <input
                                className="form-control"
                                type="text"
                                id="maxRewardsPerPost"
                                onChange={e => this.props.changeField(SettingFields.MAX_REWARDS_PER_POST, e.target.value)}
                                value={this.props.settings[SettingFields.MAX_REWARDS_PER_POST]}/>
                            <p className="help-block">Liczba odznak wyświetlana na stronie tematu. Wpisz -1, żeby usunąć limit, lub 0 żeby wyłączyć.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="activityLimit">Limit aktywności</label>
                            <input
                                className="form-control"
                                type="text"
                                id="activityLimit"
                                onChange={e => this.props.changeField(SettingFields.ACTIVITY_LIMIT, e.target.value)}
                                value={this.props.settings[SettingFields.ACTIVITY_LIMIT]}/>
                            <p className="help-block">Liczba rekordów przetwarzana w sekcji Odznaki</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="notificationText">Tekst powiadomienia</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                type="text"
                                id="notificationText"
                                onChange={e => this.props.changeField(SettingFields.NOTIFICATION_TEXT, e.target.value)}
                                value={this.props.settings[SettingFields.NOTIFICATION_TEXT]}/>
                            <p className="help-block">Tekst powiadomienia o przyznaniu użytkownikowi nagrody. Tekst zawiera zamienne tokeny: %AWARD_NAME% – nazwa nagrody.</p>
                        </div>
                    </div>
                </div>

                <PanelControls
                    disableCancel={true}
                    labelSuccess="Zapisz"
                    valid={true}
                    successDidClick={() => this.props.save()}/>

                <div className="row">
                    <div className="col-md-12">
                        <ApiTokensList/>
                    </div>
                </div>

            </div>
        );
    }

}

Settings.propTypes = {
    changeField: PropTypes.func,
    save       : PropTypes.func,
    settings   : PropTypes.object
};

export default connect(
    state => {
        return {
            settings: getSettings(state)
        };
    },
    dispatch => {
        return {
            changeField: (field, value) => dispatch(changeSettingField(field, value)),
            save       : () => dispatch(saveSettings())
        };
    }
)(Settings);
