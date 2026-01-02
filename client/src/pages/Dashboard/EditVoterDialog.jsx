import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { HrmYellowBtn, HrmBlackBtn } from '@/components/Button/Buttons';

const EditVoterDialog = ({ open, handleClose, voterData, handleSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (voterData) {
      setFormData(voterData);
    }
  }, [voterData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: '#1e40af', color: 'white' }}>
        Edit Voter Details
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Voter Name"
              name="voterName"
              value={formData.voterName || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="House Number"
              name="houseNumber"
              value={formData.houseNumber || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Status"
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid> */}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <HrmBlackBtn label="Cancel" onClick={handleClose} />
        <HrmYellowBtn label="Save" onClick={onSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default EditVoterDialog;
