import React, { Component, PropTypes } from 'react'
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classNames';

export default class WildcardSelector extends Component {

    render() {
        const { wildcardSelector, onCloseWildcardSelector, onSaveWildcardSelector, onSelectWildcard } = this.props;
        const { wildcards, selectedWildcard } = wildcardSelector;

        return (
            <Modal className="wildcard-modal" show={wildcardSelector.show} bsSize="large">
                <Modal.Header>
                    <Modal.Title className="text-xs-center">Select a wildcard...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="wildcard-list">
                        {
                            wildcards
                                .filter(wildcard => wildcard.reminding > 0 || wildcard.type === selectedWildcard.type)
                                .map(wildcard =>
                                    <li className="wildcard-item" key={wildcard._id}>
                                        <div className={classNames({ 'wildcard-box': true, 'wildcard-selected': wildcard.selected}, wildcard.type)} onClick={() => onSelectWildcard(wildcard)}>
                                            <img className="wildcard-icon" src={`./assets/images/wildcards/${wildcard.type}.png`} alt={wildcard.type}/>
                                            <div className="wildcard-description">{wildcard.description}</div>
                                            <div className="wildcard-availability">{wildcard.type === selectedWildcard.type ? 'Selected' : `${wildcard.reminding} available`}</div>
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </Modal.Body>
                <Modal.Footer className="text-xs-center">
                    <Button className="btn btn-primary btn-lg" onClick={() => onSaveWildcardSelector()}>Save</Button>
                    <Button className="btn btn-default btn-lg" onClick={() => onCloseWildcardSelector()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

WildcardSelector.propTypes = {
    wildcardSelector: PropTypes.object.isRequired,
    onCloseWildcardSelector: PropTypes.func.isRequired,
    onSelectWildcard: PropTypes.func.isRequired
};