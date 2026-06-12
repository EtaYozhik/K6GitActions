import BackendStatus from "../components/BackendStatus";

export default function Home() {
  return (
    <>
      <h2>Welcome to the Bakehouse</h2>
      <p>Your internal bakery platform.</p>
      <p>This line was deployed through GitHub Actions.</p>
      <BackendStatus />
    </>
  );
}
