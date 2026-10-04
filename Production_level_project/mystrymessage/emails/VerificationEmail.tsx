import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Body,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here's your MystryMessage verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Heading as="h2" style={heading}>
                Hello {username},
              </Heading>
            </Row>
            <Row>
              <Text style={text}>
                Thank you for registering with MystryMessage. Please use the following
                6-digit verification code to complete your registration:
              </Text>
            </Row>
            <Row>
              <Text style={otpStyle}>{otp}</Text>
            </Row>
            <Row>
              <Text style={text}>
                This code will expire in 1 hour. If you did not request this code, 
                please safely ignore this email.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const text = {
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const otpStyle = {
  fontSize: "36px",
  fontWeight: "bold",
  letterSpacing: "8px",
  color: "#1a1a1a",
  textAlign: "center" as const,
  margin: "30px 0",
};