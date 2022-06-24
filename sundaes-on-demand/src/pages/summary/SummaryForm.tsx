import { ChangeEvent, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

type OrderPhases = "INPROGRESS" | "REVIEW" | "COMPLETED";
interface SummaryFormProps {
  setOrderPhase: (orderPhase: OrderPhases) => void;
}

const SummaryForm = ({ setOrderPhase }: SummaryFormProps) => {
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <label htmlFor='checkbox-terms-conditions'>
      I agree to{" "}
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: "crimson" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </label>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrderPhase("COMPLETED");
  }

  return (
    <>
      <Form
        onSubmit={(e: React.FormEvent) => {
          handleSubmit(e);
        }}
      >
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
