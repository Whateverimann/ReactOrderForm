import React, { Component } from "react";
import "./App.css";
import ShoppingCart from "./ShoppingCart";
import Adress from "./Adress";
import DeliveryPayment from "./DeliveryPayment";
import { Steps, Button, message } from "antd";


const { Step } = Steps;

const steps = [
  {
    title: "Shopping cart",
    content: <ShoppingCart />
  },
  {
    title: "Adress",
    content: <Adress />
  },
  {
    title: "Delivery & payment",
    content: <DeliveryPayment />
  }
];

class App extends Component {
  state = {
    current: 0
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const current = this.state.current;
    return (
      <div className="form-container">
        <Steps className="ant-steps-label-vertical" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button
              className="next-button"
              type="primary"
              onClick={() => this.next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="next-button"
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button className="previous-button" onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default App;