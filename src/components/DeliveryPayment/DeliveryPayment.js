import React, { Component } from "react";
import { Row, Col, Radio, Typography} from "antd";

import "./DeliveryPayment.css";

const { Text } = Typography;

class DeliveryPayment extends Component {
  state = {
    deliveryValue: 1,
    paymentValue: 1,
    cartTotalDelivery: "",
    paczkomat: ""
  };

  prices = {
    courierPrice: 14.99,
    postPrice: 9.99,
    paczkomatPrice: 8.99,
    cashOnDelivery: 9.99,
    cashTransfer: "0.00"
  };

  onChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (target.value === 3) {
      window.easyPack.mapWidget("easypack-map", function(point) {
        window.point = point;
      });
    }

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    window.easyPackAsyncInit = function() {
      window.easyPack.init({
        points: {
          types: ["parcel_locker"],
          functions: ["parcel_collect"]
        },
        map: {
          initialTypes: ["parcel_locker"]
        }
      });
    };
  }

  getPoint = point => {
    if (window.point) {
      this.setState({
        paczkomat: window.point.name
      });
    }
  };

  render() {
    return (
      <Row className="custom-row">
        <Col className="delivery-col" xs={24} md={12}>
          <Text className="custom-title">Delivery options:</Text>
          <Radio.Group
            name="deliveryValue"
            onChange={this.onChange}
            value={this.state.deliveryValue}
          >
            <Radio className="custom-radio" value={1}>
              Kurier AtYourDoor{" "}
              <span className="price-style">{this.prices.courierPrice}</span>
            </Radio>
            <Radio className="custom-radio" value={2}>
              Poczta Polska{" "}
              <span className="price-style">{this.prices.postPrice}</span>
            </Radio>
            <Radio className="custom-radio" value={3}>
              Paczkomaty{" "}
              <span className="price-style">{this.prices.paczkomatPrice}</span>
            </Radio>
          </Radio.Group>
          {this.state.paczkomat && this.state.deliveryValue === 3 ? (
            <div className="center-div">
              <Text className="custom-text">
                Wybrałeś paczkomat:{" "}
                <span className="point">{this.state.paczkomat}</span>
              </Text>
            </div>
          ) : null}
          <div className="paczkomaty-map" onClick={this.getPoint}>
            {this.state.deliveryValue === 3 ? (
              <div id="easypack-map"></div>
            ) : null}
          </div>
        </Col>
        <Col className="delivery-col" xs={24} md={12}>
          <Text className="custom-title">Payment options:</Text>
          <Radio.Group
            name="paymentValue"
            onChange={this.onChange}
            value={this.state.paymentValue}
          >
            <Radio className="custom-radio" value={1}>
              Cash on delivery{" "}
              <span className="price-style">{this.prices.cashOnDelivery}</span>
            </Radio>
            <Radio className="custom-radio" value={2}>
              Cash transfer{" "}
              <span className="price-style">{this.prices.cashTransfer}</span>
            </Radio>
          </Radio.Group>
          <div className="summary-div">
            <Text className="custom-title total">Total:</Text>
          </div>
        </Col>
      </Row>
    );
  }
}

export default DeliveryPayment;