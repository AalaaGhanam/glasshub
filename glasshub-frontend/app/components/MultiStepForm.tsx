'use client';
import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { isValidBase64Image } from '../utils/common';
import { useRouter } from 'next/navigation';

const steps = ['Company Details', 'Upload Logo', 'Certificate Content'];

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submitCertificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          issueDate,
          logo,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit certificate');
      }

      const result = await response.json();
      window.history.pushState({}, '', `/certificates/${result.id}`);
      router.push(`/certificates/${result.id}`);
    } catch (err) {
      console.error('Error submitting certificate:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Ivalid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (!isValidBase64Image(base64String)) {
          setError('Invalid image format. Please upload a valid image.');
          return;
        }
        setPreview(base64String);
        setLogo(base64String);

        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Issue Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {error && <p className="text-red-500">{error}</p>}
            {logo && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">Preview:</Typography>
                {preview && (
                  <img
                    src={preview}
                    alt="Logo"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <TextField
            label="Certificate Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />
        );
      default:
        return 'Wrong step';
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
