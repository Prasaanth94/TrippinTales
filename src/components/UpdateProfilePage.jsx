import React, { useState, useRef, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const UpdateProfilePage = (props) => {
  const userCtx = useContext(UserContext);
  const { userData, setUpdateProfile, setProfile } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const genderRef = useRef();
  const greetingsRef = useRef();
  const selfDesciptionRef = useRef();
  const fetchData = useFetch();

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setUpdateProfile(false);
    setProfile(true);
  };

  const updateUserProfile = async (req, res) => {
    console.log(userCtx.accessToken);
    console.log(userCtx.userId);
    try {
      const res = await fetchData(
        "/api/users/" + userCtx.userId,
        "PATCH",
        {
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          greeting: greetingsRef.current.value,
          self_description: selfDesciptionRef.current.value,
          birthdate: selectedDate,
          gender: genderRef.current.value,
        },
        userCtx.accessToken
      );

      if (!res.ok) {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      } else if (res.ok) {
        setUpdateProfile(false);
        setProfile(true);
        props.getUserInfo();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    firstNameRef.current.value = userData.first_name;
    lastNameRef.current.value = userData.last_name;
    greetingsRef.current.value = userData.greeting;
    selfDesciptionRef.current.value = userData.self_description;
    genderRef.current.value = userData.gender;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={`text-center ${styles.header}`}>
          <h4 className="modal-title">Update Profile</h4>
        </div>
        <div className={styles.body}>
          <div className={`row ${styles.title}`}>
            <div className="col-md-1"></div>
            <div className="col-md-3">First Name</div>
            <input type="text" ref={firstNameRef} className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className={`row ${styles.title}`}>
            <div className="col-md-1"></div>
            <div className="col-md-3">Last Name</div>
            <input type="text" ref={lastNameRef} className="col-md-6" />
            <div className="col-md-3"></div>
          </div>

          <div className={`row ${styles.title}`}>
            <div className="col-md-1"></div>
            <label className="col-md-3" htmlFor="birthdate">
              Birth Date
            </label>
            <div className="col-md-6">
              <DatePicker
                id="birthdate"
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="yyyy-MM-dd" // You can adjust the date format as needed
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Select a date"
              />
            </div>
            <div className="col-md-3"></div>
          </div>

          <div className={`row ${styles.title}`}>
            <div className="col-md-1"></div>
            <div className="col-md-3">Gender</div>
            <select ref={genderRef} className="col-md-6">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">prefer not to say</option>
            </select>
            <div className="col-md-3"></div>
          </div>

          <div className={`row ${styles.content}`}>
            <div className="col-md-1"></div>
            <div className="col-md-3">Greeting</div>
            <textarea
              type="text"
              ref={greetingsRef}
              style={{ height: "250px" }}
              wrap="soft"
              className="col-md-6"
            />
            <div className="col-md-2"></div>
          </div>

          <div className={`row ${styles.selfdescription}`}>
            <div className="col-md-1"></div>
            <div className="col-md-3">Self Description</div>
            <textarea
              type="text"
              ref={selfDesciptionRef}
              className="col-md-6"
              style={{ height: "100px" }}
              wrap="soft"
            />
            <div className="col-md-3"></div>
          </div>

          <button onClick={updateUserProfile}>Update</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
