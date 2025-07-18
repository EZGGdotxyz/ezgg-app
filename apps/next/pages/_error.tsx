/*
 * @Date: 2025-04-08 15:58:18
 * @LastEditors: yosan
 * @LastEditTime: 2025-04-08 16:05:40
 * @FilePath: /ezgg-app/apps/next/pages/_error.tsx
 */
import * as Sentry from "@sentry/nextjs";
import Error from "next/error";

const CustomErrorComponent = (props) => {
  return <Error statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData:any) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
