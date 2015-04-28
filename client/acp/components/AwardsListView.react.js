var React              = require('react'),
    AwardsListItemView = require('./AwardsListItemView.react'),
    AwardsStore        = require('../stores/AwardsStore'),
    ReactPropTypes     = React.PropTypes,
    Actions            = require('../actions/Actions');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

var AwardsListView = React.createClass({
    componentDidMount: function () {
        AwardsStore.addChangeListener(this.awardsDidChange);
        Actions.getAwards();
    },

    componentWillUnmount: function () {
        AwardsStore.removeChangeListener(this.awardsDidChange);
    },

    awardsDidChange: function () {
        this.setState(getAwards());
    },

    getInitialState: function () {
        return getAwards();
    },

    render: function () {
        function renderItem(award, index, awards) {
            return <AwardListItemView
                key={award.aid}
                award={award}/>
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Awards</div>
                <div className="panel-body">
                    <ul className="awards-list">
                        {this.state.awards.map(renderItem)}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = AwardsListView;