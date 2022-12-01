import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { useSettings } from '../../context/settings';
import { UserSettings } from '../../models/settings.interface';
import api from '../../services/api';
import SettingsComponent from './Settings.component';

const Settings: React.FC = (): JSX.Element => {
  const { email, getEmail } = useAuth();
  const { handleSubmit, control, reset } = useForm();
  const { currentSettings, setCurrentSettings } = useSettings();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSettings = useCallback(async () => {
    setLoading(true);
    let settings: UserSettings | null = null;
    try {
      let userEmail = !email ? getEmail() : email;

      const response = await api.get<UserSettings>('/settings/' + userEmail);

      console.log({ response });

      if (response.status === 200) {
        reset({
          dom: response.data.days.dom,
          seg: response.data.days.seg,
          ter: response.data.days.ter,
          qua: response.data.days.qua,
          qui: response.data.days.qui,
          sex: response.data.days.sex,
          sab: response.data.days.sab,
          start: response.data.intervals[0].start,
          end: response.data.intervals[0].end,
        });
      } else {
        reset({
          dom: false,
          seg: false,
          ter: false,
          qua: false,
          qui: false,
          sex: false,
          sab: false,
          start: '18:00',
          end: '19:00',
        });
      }
      console.log({ control });
      console.log({ dt: response.data });
      settings = response.data;
    } catch (error) {
      console.log({ error });
      reset({
        dom: false,
        seg: false,
        ter: false,
        qua: false,
        qui: false,
        sex: false,
        sab: false,
        start: '18:00',
        end: '19:00',
      });
      // toast.error(t('failed.fetch.what', { what: t('settings').toLowerCase() }));
    } finally {
      setLoading(false);
      console.log({ settings, setCurrentSettings });
      // setCurrentSettings(settings);
    }
  }, [setLoading, setCurrentSettings]);

  useEffect(() => {
    getSettings();
  }, [getSettings, currentSettings]);

  const updateSettings = async (data) => {
    console.log(data);

    const settings: UserSettings = {
      userId: email ? email : '',
      days: {
        dom: data.dom,
        seg: data.seg,
        ter: data.ter,
        qua: data.qua,
        qui: data.qui,
        sex: data.sex,
        sab: data.sab,
      },
      intervals: [{ start: data.start, end: data.end }],
    };

    try {
      await api.put<any>('/settings', { ...settings });
      toast.success(t('save.success.what', { what: t('settings').toLowerCase() }));
    } catch (error) {
      throw new Error(t('failed.fetch.what'));
      // toast.error(t('failed.fetch.what', { what: t('settings').toLowerCase() }));
    }
  };

  const handleAction = async (data) => {
    await updateSettings(data);
  };

  const handleSettingsFormSubmit = async (data) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await handleAction(data);
    } catch (error) {
      toast.error(t('save.error.what', { what: t('settings').toLowerCase() }));
      setErrorFeedback(t('save.error.what', { what: t('settings').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsComponent
      {...{
        handleSettingsFormSubmit,
        errorFeedback,
        loading,
        handleSubmit,
        control,
      }}
    />
  );
};

export default Settings;
