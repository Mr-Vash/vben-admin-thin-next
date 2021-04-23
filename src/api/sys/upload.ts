import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/@/utils/http/axios/types';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log('----------------upload-params-------------------');
  console.log(params);
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  );
}
