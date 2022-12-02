import React from 'react';
import { mount } from 'enzyme';
import ExpandableContainer from './index';

document.body.innerHTML =
  '<div>' +
  '  <div id="something" />' +
  '</div>';

describe('ExpandableContainer', () => {
  const something = document.getElementById('something');
  const props = {
    id: 'octocat',
    isOpen: false,
    forceResize: false,
  };

  it('renders', () => {
    const comp = mount(
      <ExpandableContainer {...props}>
        <div>Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    comp.setProps({ isOpen: false });
    comp.update();

    expect(comp.state('open')).toBeFalsy();
    expect(comp.find('ExpandableContainer')).toHaveLength(1);
    expect(comp.find('GradientSvg')).toHaveLength(0);
    expect(comp.find('ExpandableContent')).toHaveLength(1);
    expect(comp.find('Toggle')).toHaveLength(1);

    comp.unmount();
  });

  it('updates open on state when isOpen prop is changed', () => {
    const comp = mount(
      <ExpandableContainer {...props}>
        <div>Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    expect(comp.state('open')).toBeFalsy();
    comp.setProps({ isOpen: true });
    comp.update();
    expect(comp.state('open')).toBeTruthy();
    comp.unmount();
  });

  it('hides the toggle if the hideToggle prop is set to true', () => {
    const noToggleProps = {
      ...props,
      hideToggle: true,
    };

    const comp = mount(
      <ExpandableContainer {...noToggleProps}>
        <div className="word">Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    expect(comp.find('Toggle')).toHaveLength(0);
    comp.unmount();
  });

  it('hides the toggle if the hideToggle prop is set to true', () => {
    const comp = mount(
      <ExpandableContainer {...props}>
        <div className="word">Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    expect(comp.state('open')).toBeFalsy();
    const spy = jest.fn();
    comp.instance().toggle({ preventDefault: spy });

    expect(spy).toHaveBeenCalled();
    expect(comp.state('open')).toBeTruthy();
    comp.unmount();
  });


  it('calls the onToggle function when component toggle is called', () => {
    const toggleProps = {
      ...props,
      onToggle: jest.fn(),
      controlled: true,
    };

    const comp = mount(
      <ExpandableContainer {...toggleProps}>
        <div className="word">Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    comp.instance().toggle({ preventDefault: jest.fn() });

    expect(comp.prop('onToggle')).toHaveBeenCalled();
    comp.unmount();
  });

  it('forces resizing', () => {
    const comp = mount(
      <ExpandableContainer {...props}>
        <div className="word">Word</div>
      </ExpandableContainer>, {
        attachTo: something,
      });

    const spy = jest.spyOn(comp.instance(), 'onResize');

    comp.setProps({ forceResize: true });
    expect(spy).toHaveBeenCalled();
    comp.unmount();
  });
});
