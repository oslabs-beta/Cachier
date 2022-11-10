import React, { useEffect } from 'react';
// import fetch from node-fetch

const App = () => {
  useEffect(() => {
    const queryStr = `{
      cores(limit: 10) {
        asds_attempts
        block
        missions {
          flight
          name
        }
        original_launch
      }
      coresPast(find: {asds_attempts: 10}) {
        reuse_count
        original_launch
        missions {
          flight
          name
        }
      }
      dragon(id: "") {
        active
        diameter {
          feet
          meters
        }
      }
      capsule(id: "") {
        dragon {
          crew_capacity
          dry_mass_lb
          height_w_trunk {
            meters
          }
          launch_payload_vol {
            cubic_feet
            cubic_meters
          }
          return_payload_mass {
            lb
            kg
          }
          return_payload_vol {
            cubic_feet
            cubic_meters
          }
        }
      }
      payload(id: "") {
        customers
        id
        nationality
        orbit_params {
          epoch
        }
        reused
        payload_mass_lbs
        payload_mass_kg
      }
      roadster {
        speed_mph
        launch_date_utc
        launch_date_unix
        apoapsis_au
        earth_distance_km
        earth_distance_mi
        eccentricity
        epoch_jd
        inclination
        launch_mass_lbs
        launch_mass_kg
        mars_distance_mi
        norad_id
        periapsis_au
        period_days
        longitude
        mars_distance_km
      }
    }
    
    `;

    const start = performance.now();
    fetch('http://localhost:3000/cacheMoney', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        query: queryStr,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const end = performance.now();
        const latency = end - start;
        console.log(data);
      });
  }, []);
  return <div> Bling Bling Cache Money </div>;
};

export default App;
