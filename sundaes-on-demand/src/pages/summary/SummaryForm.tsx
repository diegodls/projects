import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);

  const checkboxLabel = (
    <label htmlFor='checkbox-terms-conditions'>
      I agree to <a href='#'>Terms and Conditions</a>
    </label>
  );
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Check
            type='checkbox'
            id='checkbox-terms-conditions'
            checked={termsAndConditions}
            aria-label='I agree to Terms and Conditions'
            label={checkboxLabel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTermsAndConditions(e.target.checked);
            }}
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={!termsAndConditions}>
          Confirm order
        </Button>
      </Form>
    </>
  );
};

export default SummaryForm;
