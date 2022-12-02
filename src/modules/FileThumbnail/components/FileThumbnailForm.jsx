import React, { Component } from 'react';
import { SelectField } from '@unite-us/ui';
import FileThumbnail from '../../FileThumbnail';
import './file-thumbnail-form.scss';

const options = [
  { label: 'Audio (.mp3)', value: 'audio/mp3' },
  { label: 'Audio (.wav)', value: 'audio/wav' },
  { label: 'Binary (.bin)', value: 'application/octet-stream' },
  { label: 'Comma Separated Values (.csv)', value: 'text/csv' },
  { label: 'Image (.jpeg / .jpg)', value: 'image/jpeg' },
  { label: 'Image (.png)', value: 'image/png' },
  { label: 'MS Word (.doc)', value: 'application/msword' },
  { label: 'MS Word (.docx)', value: 'application/vnc.openxmlformats-officedocument.wordprocessingml.document' },
  { label: 'MS Excel (.xls)', value: 'application/vnd.ms-excel' },
  { label: 'MS Excel (.xlsx)', value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  { label: 'PDF (.pdf)', value: 'application/pdf' },
  { label: 'Plain Text (.txt)', value: 'text/plain' },
  { label: 'Video (.mp4)', value: 'video/mpeg' },
  { label: 'Video (.mpeg)', value: 'video/mpeg' },
  { label: 'Zip / Archive (.zip)', value: 'application/zip' },
  { label: 'Unknown / Other', value: 'unknown' },
];

class FileThumbnailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'audio/mp3',
    };
  }

  render() {
    const { contentType } = this.state;

    return (
      <div className="file-thumbnail-form">
        <div className="file-thumbnail-form__icon ml-one mr-two">
          <FileThumbnail
            contentType={contentType}
          />
        </div>
        <div className="file-thumbnail-form__select ml-one">
          <SelectField
            id="type-select-field"
            label="Content Type"
            onChange={(value) => {
              this.setState({ contentType: value });
            }}
            options={options}
            shouldSort={false}
            value={contentType}
          />
        </div>
      </div>
    );
  }
}

export default FileThumbnailForm;
