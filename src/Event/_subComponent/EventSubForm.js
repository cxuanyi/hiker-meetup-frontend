import React, { Fragment } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
// core components
import GridContainer from "../../_rootComponent/Grid/GridContainer";
import GridItem from "../../_rootComponent/Grid/GridItem";
import CustomInput from "../../_rootComponent/CustomInput/CustomInput";
// style for this view
import formStyle from "../../_rootAsset/jss/formStyle";
// others
import { FORM1_CHECK_READY } from "../_subAction/createEventAction";

const useFormStyle = makeStyles(formStyle);

const EventSubForm = props => {
  // eslint-disable-next-line no-unused-vars
  const {
    dispatchValidate,
    fieldsStatus,
    setFieldsStatus,
    event,
    setEvent
  } = props;
  const classes = { ...useFormStyle() };
  const handleTextFieldChange = e => {
    const { name, value } = e.target;
    value
      ? setFieldsStatus({ ...fieldsStatus, [name]: 2 })
      : setFieldsStatus({ ...fieldsStatus, [name]: 1 });

    setEvent({ ...event, [name]: value });
    dispatchValidate({
      action: FORM1_CHECK_READY,
      payload: {
        formNo: 1,
        fieldsStatus: fieldsStatus
      }
    });
  };

  return (
    <Fragment>
      <GridContainer>
        <GridItem>
          <p className={classes.title}>Fill in [EVENT Email] Details</p>
          <div className={classes.iconWrapper}>
            <MailOutline fontSize="small" />
          </div>
        </GridItem>
      </GridContainer>
      <GridContainer className={classes.childContainer}>
        <GridItem lg={12}>
          <GridContainer className={classes.gridAlternateBgColor}>
            <GridItem lg={2}>
              <FormLabel
                className={classes.labelHorizontalForm}
                required={true}
              >
                Event Name:
              </FormLabel>
            </GridItem>
            <GridItem lg={9}>
              <CustomInput
                success={fieldsStatus.name === 2}
                error={fieldsStatus.name === 1}
                labelText="(e.g. EVENT-VPRO-00075, EVENT-AIP821-00189, etc)"
                id="name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "name",
                  type: "text",
                  value: event.name,
                  onChange: e => handleTextFieldChange(e)
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

EventSubForm.propTypes = {
  dispatchValidate: PropTypes.func,
  formValidityState: PropTypes.object,
  fieldsStatus: PropTypes.object,
  setFieldsStatus: PropTypes.func,
  event: PropTypes.object,
  setEvent: PropTypes.func,
  children: PropTypes.node
};

export default EventSubForm;
