import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import useInputTypes from '../hooks/useInputTypes';

function DataTableToolbar({ setSearch }) {
  const applicationType = useInputTypes('applicationType');
  const actionType = useInputTypes('actionType');

  const styles = {
    textField: { mr: 1, ml: 1 },
  };

  return (
    <Box>
      <Typography
        sx={{ flex: '1 1 100%', mt: 5, mb: 5, fontSize: 40 }}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Data Table
      </Typography>

      <Box>
        <Formik
          initialValues={{
            actionType: '',
            applicationType: '',
            applicationId: '',
            fromDate: '',
            toDate: '',
          }}
          validationSchema={Yup.object().shape({
            fromDate: Yup.string().required('Required'),
            toDate: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSearch(values);
            console.log('values', values);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleChange, errors, touched }) => (
            <Form>
              <FormControl sx={[styles.textField, { width: 300 }]}>
                <InputLabel>Action type</InputLabel>
                <Select
                  name='actionType'
                  value={values.actionType}
                  onChange={handleChange}
                  input={<OutlinedInput label='Action type' />}
                >
                  <MenuItem key={''} value={''}>
                    None
                  </MenuItem>
                  {actionType?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() +
                        item?.slice(1).toLowerCase().replaceAll('_', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={[styles.textField, { width: 300 }]}>
                <InputLabel>Application type</InputLabel>
                <Select
                  name='applicationType'
                  value={values.applicationType}
                  onChange={handleChange}
                  input={<OutlinedInput label='Application type' />}
                >
                  <MenuItem key={''} value={''}>
                    None
                  </MenuItem>
                  {applicationType?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() +
                        item?.slice(1).toLowerCase().replaceAll('_', ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                sx={styles.textField}
                name='applicationId'
                value={values.applicationId}
                label='Application Id'
                onChange={handleChange}
              />
              <TextField
                error={errors.fromDate && touched.fromDate}
                sx={styles.textField}
                name='fromDate'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={values.fromDate}
                label='From Data'
                onChange={handleChange}
                helperText={errors.fromDate && touched.fromDate && 'Required'}
              />
              <TextField
                error={errors.toDate && touched.toDate}
                sx={styles.textField}
                name='toDate'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={values.toDate}
                label='To Date'
                onChange={handleChange}
                helperText={errors.toDate && touched.toDate && 'Required'}
              />
              <Button
                variant='contained'
                type='submit'
                size='large'
                disabled={isSubmitting}
                sx={{ height: 55 }}
              >
                Search logger
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
export default DataTableToolbar;
