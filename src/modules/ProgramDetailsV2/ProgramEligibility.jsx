import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Divider } from '@unite-us/ui';
import DraftEditorField from 'modules/form/DraftEditorField';
import ExpandableContainer from 'modules/ExpandableContainer';
import LabelTextInline from 'modules/Shared/LabelTextInline';


const ProgramEligibility = (props) => {
  const {
    className,
    program: {
      accessibility_options,
      cities,
      counties,
      delivery_options,
      description,
      eligibility_text,
      languages,
      payment_options,
      population_specializations,
      population_restrictions,
      states,
      transportation_options,
    },
    sectionEmpty,
    showLess,
    showMore,
  } = props;

  return (
    <div className={classNames('program-description__eligibility', className)} >
      <div className={classNames({ hidden: sectionEmpty.eligibility })}>
        <ExpandableContainer
          collapsedHeight="70px"
          id="test-expandable"
          controlled
          isOpen={showMore}
          hideToggle
          showGradient={showLess}
        >
          <h4 className="mb-half">Eligibility</h4>
          <DraftEditorField
            className="pb-one"
            hideLabel
            id="program-eligibility_text"
            label="Eligibility"
            readOnly
            value={eligibility_text || ''}
          />
        </ExpandableContainer>
      </div>

      {/* Adding additional expandable when eligibility DNE */}

      {
        sectionEmpty.eligibility && description && showLess ? (
          <ExpandableContainer
            collapsedHeight="70px"
            id="test-expandable"
            controlled
            isOpen={showMore}
            hideToggle
            showGradient={showLess}
          >
            <h4 className="mb-one">Description</h4>
            <DraftEditorField
              className="mb-two"
              label="Description"
              hideLabel
              id="program-description-text"
              value={description}
              readOnly
            />
          </ExpandableContainer>
        ) : null
      }

      {
        !sectionEmpty.geography && showMore ? (
          <div>
            {!sectionEmpty.eligibility ?
              (<Divider className="program-details__divider" />) : null}

            <h4 className="mb-one">Client must live in the following...</h4>
            <LabelTextInline
              className="mb-one"
              label="States"
              content={states}
            />
            <LabelTextInline
              className="mb-one"
              label="Counties"
              content={counties}
            />
            <LabelTextInline
              className="mb-one"
              label="Cites"
              content={cities}
            />
          </div>
        ) : null
      }

      {
        showMore && (
          <div>
            {!sectionEmpty.geography || !sectionEmpty.eligibility ?
              (<Divider className="program-details__divider" />) : null}
            <LabelTextInline
              className="mb-one"
              label="Populations restricted to"
              content={population_restrictions}
            />

            <LabelTextInline
              className="mb-one"
              label="Populations catered to"
              content={population_specializations}
            />

            <LabelTextInline
              className="mb-one"
              label="Languages"
              content={languages}
            />

            <LabelTextInline
              className="mb-one"
              label="Transportation"
              content={transportation_options}
            />

            <LabelTextInline
              className="mb-one"
              label="Accessibility"
              content={accessibility_options}
            />

            <LabelTextInline
              className="mb-one"
              label="Primary Method of Service Delivery"
              content={delivery_options}
            />

            <LabelTextInline
              className="mb-one"
              label="Payment options"
              content={payment_options}
            />
          </div>
        )
      }
    </div>
  );
};

ProgramEligibility.propTypes = {
  className: PropTypes.string,
  showMore: PropTypes.bool,
  showLess: PropTypes.bool,
  program: PropTypes.object.isRequired,
  sectionEmpty: PropTypes.object,
};

ProgramEligibility.defaultProps = {
  className: '',
  sectionEmpty: {
    eligibility: false,
    geography: false,
  },
  showLess: false,
  showMore: false,
};

export default ProgramEligibility;
