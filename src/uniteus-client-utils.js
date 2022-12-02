import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import ButtonSelect from './modules/ButtonSelect/index';
import Wrapper from './Wrapper'

export default function Root(props) {
    return (
      <div>
        <section>{props.name} is mounted!</section>
        <Wrapper>
          <p>Wrapper</p>
        </Wrapper>
        <ButtonSelect
             id="status-select-options"
             className="status-select__button-select"
             valueKey="value"
             labelKey="label"
             placeholder={'So Long, and Thanks for All the Fish'}
          />
      </div>
    );
  }

// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {}

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Root,
    errorBoundary(err, info, props) {
      // Customize the root error boundary for your microfrontend here.
      return null;
    },
  });
  
  export const { bootstrap, mount, unmount } = lifecycles;
  
  