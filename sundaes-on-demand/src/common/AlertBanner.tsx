import { Alert } from "react-bootstrap";

interface AlertBannerProps {
  message?: string;
  variant?: string;
}

const AlertBanner = ({ message, variant }: AlertBannerProps) => {
  const alertMessage = message || "An error occurred. Please try again later.";

  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
