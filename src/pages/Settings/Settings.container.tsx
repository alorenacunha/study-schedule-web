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
  const { user, getUser } = useAuth();
  const { handleSubmit, control, reset } = useForm();
  const { currentSettings, setCurrentSettings } = useSettings();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSettings = useCallback(async () => {
    setLoading(true);
    console.log({ user });
    try {
      if (!user) getUser();

      const response = await api.get<UserSettings>('/users/settings/' + user?.userId);

      console.log({ data: response.data });

      reset({
        dom: response.data?.days?.dom,
        seg: response.data?.days?.seg,
        ter: response.data?.days?.ter,
        qua: response.data?.days?.qua,
        qui: response.data?.days?.qui,
        sex: response.data?.days?.sex,
        sab: response.data?.days?.sab,
        start: response.data?.intervals?.start,
        end: response.data?.intervals?.end,
      });

      setCurrentSettings(response.data);
    } catch (error) {
      toast.error(t('failed.fetch.what', { what: t('settings').toLowerCase() }));
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCurrentSettings]);

  useEffect(() => {
    reset({
      dom: false,
      seg: false,
      ter: false,
      qua: false,
      qui: false,
      sex: false,
      sab: false,
    });
    getSettings();
  }, [getSettings, currentSettings, reset]);

  const updateSettings = (data) => {
    console.log(data);
    api.put<any>('/settings/' + currentSettings?.userId, { ...data });
  };

  const handleAction = (data) => {
    console.log({ data });
    updateSettings(data);
  };

  const handleSettingsFormSubmit = async (data) => {
    if (loading) return;

    setErrorFeedback(null);
    setLoading(true);

    try {
      await handleAction(data);

      toast.success(t('save.success.what', { what: t('settings').toLowerCase() }));
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
