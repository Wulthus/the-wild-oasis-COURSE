import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from "../../ui/Spinner";
import useUpdateSetting from './useUpdateSettings';

function UpdateSettingsForm() {

  const { isUpdating, updateSetting } = useUpdateSetting();

  const {isLoading, settings: {
    BREAKFAST_PRICE,
    MAX_BOOKING_LENGTH,
    MAX_GUESTS_PER_BOOKING,
    MIN_BOOKING_LENGTH,
  } = {}} = useSettings();

  if(isLoading) return <Spinner></Spinner>

  function handleUpdate(e, field){
    const { value } = e.target;
    if(!value) return;
    updateSetting({
      [field]:value, 
    })
  }


  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={MIN_BOOKING_LENGTH} disabled={isUpdating} onBlur={(e)=>handleUpdate(e, 'MIN_BOOKING_LENGTH')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'  defaultValue={MAX_BOOKING_LENGTH} disabled={isUpdating} onBlur={(e)=>handleUpdate(e, 'MAX_BOOKING_LENGTH')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={MAX_GUESTS_PER_BOOKING} disabled={isUpdating} onBlur={(e)=>handleUpdate(e, 'MAX_GUESTS_PER_BOOKING')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={BREAKFAST_PRICE} disabled={isUpdating} onBlur={(e)=>handleUpdate(e, 'BREAKFAST_PRICE')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
