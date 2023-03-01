import NavigationBar from "../components/NavigationBar";
import ProtectedRoute from "../routes/ProtectedRoute";

function Root(): JSX.Element {
  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Rating</th>
                <th>Office</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>1400</td>
                <td>Stockholm</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>1820</td>
                <td>Stockholm</td>
              </tr>
              {/* row 3 */}
              <tr className="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>1300</td>
                <td>Lund</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Root;
