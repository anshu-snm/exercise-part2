import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import axios from "axios";
import Table from "./Table";

function App() {
  let callOptions = [];
  let labelOptions = [];
  const [final_data, setfinal] = useState([]);
  let rowOperationData = { operation: { callList: [], label_ops: [] } };
  // {"operation":{"callList":[0,1,2],"label_ops":[{"name":"random","op":"add"},{"name":"unread","op":"add"}]}}
  const sendOperation = (toAdd) => {
    rowOperationData.operation.callList = selected.map((ele) => ele.value);
    rowOperationData.operation.label_ops = labelSelected.map((ele) => {
      return { name: ele.value, op: toAdd ? "add" : "remove" };
    });
    console.log(rowOperationData);
    axios
      .post(
        "https://damp-garden-93707.herokuapp.com/applyLabels",
        rowOperationData,
        {
          headers: {
            //"Content-Type": "text/plain",
            user_id: "24b456",
          },
        }
      )
      .then(({ data }) => console.log(data));
    console.log(final_data);
  };
  const onFinal = () => {
    axios
      .get("https://damp-garden-93707.herokuapp.com/getcalllist", {
        headers: {
          user_id: "24b456",
        },
      })
      .then(function ({ data }) {
        // handle success
        setfinal([]);
        setfinal(data.data.call_data);
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("https://damp-garden-93707.herokuapp.com/getcalllist", {
        headers: {
          user_id: "24b456",
        },
      })
      .then(function ({ data }) {
        // handle success
        data.data.call_data.forEach((ele) => {
          const op = {
            label: ele.call_id,
            value: ele.call_id,
          };
          callOptions.push(op);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    axios
      .get("https://damp-garden-93707.herokuapp.com/getlistoflabels", {
        headers: {
          user_id: "24b456",
        },
      })
      .then(function ({ data }) {
        // handle success
        data.data.unique_label_list.forEach((ele) => {
          const op = {
            label: ele,
            value: ele,
          };
          labelOptions.push(op);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  const [selected, setSelected] = useState([]);
  const [labelSelected, setlabelSelected] = useState([]);

  return (
    <div>
      <h1>Add or Remove Labels </h1>

      <MultiSelect
        options={callOptions}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        //displayValue ="call_id"
      />

      <MultiSelect
        options={labelOptions}
        value={labelSelected}
        onChange={setlabelSelected}
        labelledBy={"Select"}
        //displayValue ="call_id"
      />
      <button
        type="submit"
        onClick={() => {
          sendOperation(true);
        }}
      >
        Add Label
      </button>
      <button
        type="submit"
        onClick={() => {
          sendOperation(false);
        }}
      >
        Remove Label
      </button>
      <button type="submit" onClick={onFinal}>
        updatedata
      </button>

      <Table final_data={final_data} />
    </div>
  );
}

export default App;
