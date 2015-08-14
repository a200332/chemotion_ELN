import React from 'react';
import {Button, ButtonToolbar, FormControls, Input, Modal, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import SVG from 'react-inlinesvg';

import ElementActions from './actions/ElementActions';
import ElementStore from './stores/ElementStore';
import NumeralInputWithUnits from './NumeralInputWithUnits'

import Aviator from 'aviator';

export default class SampleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: null,
      id: props.id
    }
  }

  componentDidMount() {
    ElementStore.listen(this.onChange.bind(this));
    if(this.state.id) {
      ElementActions.fetchSampleById(this.state.id);
    }
  }

  componentWillUnmount() {
    ElementStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    if(state.currentElement) {
      this.setState({
        sample: state.currentElement,
        id: state.currentElement.id
      });
    }
  }

  closeDetails() {
    Aviator.navigate('/');
  }

  updateSample() {
    ElementActions.updateSample({
      id: this.state.id,
      name: this.state.sample.name,
      amount_value: this.state.sample.amount_value,
      amount_unit: this.state.sample.amount_unit
    })
  }

  handleNameChanged(e) {
    let sample = this.state.sample;
    sample.name = this.refs.nameInput.getValue();
    this.setState({
      sample: sample
    });
  }

  handleAmountChanged(amount) {
    let sample = this.state.sample;
    sample.amount_unit = amount.unit;
    sample.amount_value = amount.value;
    this.setState({
      sample: sample
    });
  }

  render() {
    let ajaxCall = (unit, nextUnit, value) => {
      console.log("ajax call with unit: " + unit + " nextUnit: " + nextUnit + " and value: " + value);
      let convertedValue = value;
      if (unit && nextUnit && unit != nextUnit) {
        switch (unit) {
          case 'g':
            if (nextUnit == 'mol') {
              convertedValue = value * 2;
            }
            break;
          case 'mol':
            if (nextUnit == 'g') {
              convertedValue = value / 2;
            }
            break;
        }
      }
      console.log("result:" + convertedValue);
      return convertedValue;
    };

    let sample = this.state.sample || {}
    let sampleAmount = sample.amount_value && sample.amount_unit ? `(${sample.amount_value} ${sample.amount_unit})` : '';
    let svg = sample.molecule_svg ? (<SVG key={sample.id} src={`/assets/${sample.molecule_svg}`} className="molecule-mid"/>) : '';

    return (
      <div>
        <Panel header="Sample Details" bsStyle='primary'>
          <table width="100%" height="190px"><tr>
            <td width="70%">
              <h3>{sample.name}</h3>
              <h4>{sampleAmount}</h4>
            </td>
            <td width="30%">
              {svg}
            </td>
          </tr></table>
          <ListGroup fill>
            <ListGroupItem>
              <form>
                <Input type="text" label="Name" ref="nameInput"
                  placeholder={sample.name}
                  value={sample.name}
                  onChange={(e) => this.handleNameChanged(e)}
                />
                <NumeralInputWithUnits
                   value={sample.amount_value}
                   unit={sample.amount_unit || 'g'}
                   label="Amount"
                   units={['g', 'ml', 'mol']}
                   numeralFormat='0,0.00'
                   convertValueFromUnitToNextUnit={(unit, nextUnit, value) => ajaxCall(unit, nextUnit, value)}
                   onChange={(amount) => this.handleAmountChanged(amount)}
                />
                <Input type='textarea' label='Description' rows={3} />
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.closeDetails.bind(this)}>Back</Button>
                  <Button bsStyle="warning" onClick={this.updateSample.bind(this)}>Update Sample</Button>
                </ButtonToolbar>
              </form>
            </ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    )
  }
}

