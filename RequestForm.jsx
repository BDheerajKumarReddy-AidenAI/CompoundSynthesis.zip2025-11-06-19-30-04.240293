import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormHelperText,
  InputAdornment,
  Grid,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './style.scss'; // Adjust the import path as needed

const CompoundRequestForm = () => {
  const [formData, setFormData] = useState({
    requesterName: '',
    department: '',
    email: '',
    supervisorName: '',
    requestDate: new Date(),
    compoundName: '',
    smilesString: '',
    inchiString: '',
    molecularStructure: null,
    casNumber: '',
    molecularWeight: null,
    targetPathway: '',
    proposedUse: '',
    controlledSubstance: false,
    relatedCompoundIds: '',
    priorityLevel: '',
    justification: '',
    requestedQuantity: null,
    purityRequirement: null,
    timelineRequired: null,
    ipSensitive: false,
    externalDisclosureRisk: false,
    disclosureCommentText: '',
    supportingProtocol: null,
    references: '',
    analogueCompounds: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const today = new Date();
    setFormData((prevState) => ({
      ...prevState,
      requestDate: today,
    }));
  }, []);

  const validate = () => {
    const validationErrors = {};
    if (!formData.department) validationErrors.department = 'Department is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.supervisorName) validationErrors.supervisorName = 'Supervisor Name is required';
    if (!/^[\w\s\-_]+$/.test(formData.compoundName)) validationErrors.compoundName = 'Invalid compound name';
    if (!formData.smilesString) validationErrors.smilesString = 'SMILES String is required';
    if (!formData.inchiString) validationErrors.inchiString = 'InChI String is required';
    if (!/^[\d\-]+$/i.test(formData.casNumber)) validationErrors.casNumber = 'Invalid CAS Number';
    if (!formData.targetPathway) validationErrors.targetPathway = 'Target Pathway is required';
    if (formData.proposedUse.length < 20) validationErrors.proposedUse = 'Proposed Use must be at least 20 characters';
    if (!formData.priorityLevel) validationErrors.priorityLevel = 'Priority Level is required';
    if (!formData.requestedQuantity) validationErrors.requestedQuantity = 'Requested Quantity is required';
    if (!formData.purityRequirement) validationErrors.purityRequirement = 'Purity Requirement is required';
    if (!formData.timelineRequired) validationErrors.timelineRequired = 'Timeline Required is required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleDateChange = (newDate, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: newDate,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e, name) => {
    const files = e.target.files;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? Array.from(files) : null,
    }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form data to the server or handle as needed
      console.log('Form submitted:', formData);
    }
  };

  const handlePriorityChange = (e) => {
    handleChange(e);
    const { value } = e.target;
    if (value === 'High') {
      setFormData((prevState) => ({
        ...prevState,
        justification: '',
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        justification: null,
      }));
    }
  };

  const handleDisclosureRiskChange = (e) => {
    handleCheckboxChange(e);
    const { checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        disclosureCommentText: '',
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        disclosureCommentText: null,
      }));
    }
  };

  const onSaveDraft = () => {
    console.log('Draft saved:', formData);
  };

  const onPreview = () => {
    console.log('Preview:', formData);
  };

  const onValidateStructure = () => {
    console.log('Validating structure:', formData.smilesString);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmitRequest}
      sx={{ maxWidth: 850, padding: '24px', display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'white', borderRadius: 1 }}
    >
      <Typography variant="h6">Compound Synthesis Request</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Requester Name"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f9f9f9', borderRadius: '4px' },
            }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" error={Boolean(errors.department)} margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <MenuItem value="Medicinal Chemistry">Medicinal Chemistry</MenuItem>
              <MenuItem value="Discovery Biology">Discovery Biology</MenuItem>
              <MenuItem value="Pharmacology">Pharmacology</MenuItem>
              <MenuItem value="Toxicology">Toxicology</MenuItem>
            </Select>
            {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: '#f9f9f9', borderRadius: '4px' },
            }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Supervisor Name"
            name="supervisorName"
            value={formData.supervisorName}
            onChange={handleChange}
            required
            error={Boolean(errors.supervisorName)}
            helperText={errors.supervisorName}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Request"
              name="requestDate"
              value={formData.requestDate}
              onChange={(newDate) => handleDateChange(newDate, 'requestDate')}
              readOnly
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Compound Name"
            name="compoundName"
            value={formData.compoundName}
            onChange={handleChange}
            required
            error={Boolean(errors.compoundName)}
            helperText={errors.compoundName}
            InputProps={{
              style: { backgroundColor: '#f9f9f9', borderRadius: '4px' },
            }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              maxLength: 100,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="SMILES String"
            name="smilesString"
            value={formData.smilesString}
            onChange={handleChange}
            multiline
            rows={4}
            required
            error={Boolean(errors.smilesString)}
            helperText={errors.smilesString}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onValidateStructure} style={{ marginBottom: '12px' }}>
            Validate Structure
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="InChI String"
            name="inchiString"
            value={formData.inchiString}
            onChange={handleChange}
            multiline
            rows={4}
            required
            error={Boolean(errors.inchiString)}
            helperText={errors.inchiString}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Molecular Structure"
            name="molecularStructure"
            type="file"
            onChange={(e) => handleFileChange(e, 'molecularStructure')}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: '.mol,.sdf,.cdx,.png,.jpg' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CAS Number"
            name="casNumber"
            value={formData.casNumber}
            onChange={handleChange}
            error={Boolean(errors.casNumber)}
            helperText={errors.casNumber}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              pattern: '^\\d{1,7}-\\d{2}-\\d$',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Molecular Weight"
            name="molecularWeight"
            value={formData.molecularWeight}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
              style: { backgroundColor: '#f9f9f9', borderRadius: '4px' },
            }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              min: 100,
              max: 800,
              type: 'number',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" error={Boolean(errors.targetPathway)} margin="normal">
            <InputLabel>Target Pathway</InputLabel>
            <Select
              label="Target Pathway"
              name="targetPathway"
              value={formData.targetPathway}
              onChange={handleChange}
              required
            >
              <MenuItem value="GPCR Signaling">GPCR Signaling</MenuItem>
              <MenuItem value="Kinase Inhibition">Kinase Inhibition</MenuItem>
              <MenuItem value="Protease Inhibition">Protease Inhibition</MenuItem>
              <MenuItem value="Ion Channel Modulation">Ion Channel Modulation</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.targetPathway && <FormHelperText>{errors.targetPathway}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Proposed Use"
            name="proposedUse"
            value={formData.proposedUse}
            onChange={handleChange}
            multiline
            rows={4}
            required
            error={Boolean(errors.proposedUse)}
            helperText={errors.proposedUse}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              minLength: 20,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formData.controlledSubstance}
            onChange={handleCheckboxChange}
            name="controlledSubstance"
            inputProps={{ 'aria-label': 'controlledSubstance checkbox' }}
          />
          <Typography variant="body1" component="span">
            Is this a controlled substance?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Related Compound IDs"
            name="relatedCompoundIds"
            value={formData.relatedCompoundIds}
            onChange={handleChange}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" error={Boolean(errors.priorityLevel)} margin="normal">
            <InputLabel>Priority Level</InputLabel>
            <Select
              label="Priority Level"
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handlePriorityChange}
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            {errors.priorityLevel && <FormHelperText>{errors.priorityLevel}</FormHelperText>}
          </FormControl>
        </Grid>
        {formData.priorityLevel === 'High' && (
          <Grid item xs={12}>
            <TextField
              label="Priority Justification"
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              multiline
              rows={4}
              inputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
              sx={{ width: '100%', marginBottom: '12px' }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Requested Quantity (mg)"
            name="requestedQuantity"
            value={formData.requestedQuantity}
            onChange={handleChange}
            required
            error={Boolean(errors.requestedQuantity)}
            helperText={errors.requestedQuantity}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              type: 'number',
              min: 1,
              max: 500,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Purity Requirement (%)"
            name="purityRequirement"
            value={formData.purityRequirement}
            onChange={handleChange}
            required
            error={Boolean(errors.purityRequirement)}
            helperText={errors.purityRequirement}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            inputProps={{
              type: 'number',
              min: 90,
              max: 100,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Timeline Required"
              name="timelineRequired"
              value={formData.timelineRequired}
              onChange={(newDate) => handleDateChange(newDate, 'timelineRequired')}
              required
              renderInput={(params) => (
                <TextField {...params} error={Boolean(errors.timelineRequired)} helperText={errors.timelineRequired} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formData.ipSensitive}
            onChange={handleCheckboxChange}
            name="ipSensitive"
            inputProps={{ 'aria-label': 'ipSensitive checkbox' }}
          />
          <Typography variant="body1" component="span">
            Is this compound IP-sensitive?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formData.externalDisclosureRisk}
            onChange={handleCheckboxChange}
            name="externalDisclosureRisk"
            inputProps={{ 'aria-label': 'externalDisclosureRisk checkbox' }}
          />
          <Typography variant="body1" component="span">
            External Disclosure Risk?
          </Typography>
        </Grid>
        {formData.externalDisclosureRisk && (
          <Grid item xs={12}>
            <TextField
              label="Disclosure Risk Comment"
              name="disclosureCommentText"
              value={formData.disclosureCommentText}
              onChange={handleChange}
              multiline
              rows={4}
              inputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
              sx={{ width: '100%', marginBottom: '12px' }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Supporting Protocol (PDF/DOCX)"
            name="supportingProtocol"
            type="file"
            onChange={(e) => handleFileChange(e, 'supportingProtocol')}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: '.pdf,.docx', multiple: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="References"
            name="references"
            value={formData.references}
            onChange={handleChange}
            multiline
            rows={4}
            inputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Analogue Compounds"
            name="analogueCompounds"
            type="file"
            onChange={(e) => handleFileChange(e, 'analogueCompounds')}
            InputProps={{ style: { backgroundColor: '#f9f9f9', borderRadius: '4px' } }}
            sx={{ width: '100%', marginBottom: '12px' }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: '.mol,.sdf,.txt' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onSaveDraft}>
            Save Draft
          </Button>
          <Button variant="contained" color="success" onClick={onPreview} sx={{ marginLeft: 1 }}>
            Preview
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 1 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompoundRequestForm;