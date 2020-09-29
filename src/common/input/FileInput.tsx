import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface FileInputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  name: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  inputFileWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  inputFile: {
    opacity: 0,
    appearance: 'none',
    position: 'absolute',
  },
  inputFileName: {
    width: '24em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

const FileInput: React.FC<FileInputProps> = (props) => {
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = _.get(event, 'currentTarget.files.0.name', '');
      setFileName(value);
      if (props.onChange) props.onChange(event);
    },
    [props],
  );

  return (
    <div className={classes.inputFileWrapper}>
      <Button component="label" variant="contained">
        <input
          {...props}
          type="file"
          className={classes.inputFile}
          ref={props.inputRef}
          onChange={handleChange}
        />
        {fileName === '' ? 'ファイルを添付する' : 'ファイルを変更する'}
      </Button>
      <Typography className={classes.inputFileName}>{fileName}</Typography>
    </div>
  );
};

export default FileInput;
