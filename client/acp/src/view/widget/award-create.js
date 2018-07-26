import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setAwardCreationState} from '../../action/actions';
import NewAwardForm from '../widget/new-award-form';
import PromptView from '../display/prompt-view';
import {isCreationActive} from '../../model/selector/selectors';

class AwardCreate extends React.Component {

    render() {
        return (
            (this.props.creationActive) ? <NewAwardForm />
                : <PromptView
                label="Utwórz odznakę..."
                hint="Nadawaj odznakom jasne i zwięzłe nazwy, myśl o nich jak o orderach, np. „Order Podwiązki”, czy tytułach, np. „Miss Świata”."
                labelDidClick={() => this.props.activateForm()}/>
        );
    }
}

AwardCreate.propTypes = {
    activateForm  : PropTypes.func,
    creationActive: PropTypes.bool
};

export default connect(
    (state) => {
        return {
            creationActive: isCreationActive(state)
        };
    },
    (dispatch) => {
        return {
            activateForm: () => dispatch(setAwardCreationState(true))
        };
    }
)(AwardCreate);
