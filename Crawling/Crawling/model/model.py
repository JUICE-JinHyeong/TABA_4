import triton_python_backend_utils as pb_utils
from predict_rena_v2 import psng_predict_all_v2
import pandas as pd

class TritonPythonModel:
    def __init__(self):
        self.psng_predictor = None

    def initialize(self, args):
        """
        'initialize' 메소드는 모델이 Triton 서버에 load될 때 한 번 호출됩니다.
        모델의 state를 초기화하는데 사용할 수 있습니다. 반드시 구현할 필요는 없습니다.

        Parameters
        ----------
        args : dict
          - "model_config" : config.pbtxt의 내용을 담은 JSON string
          - "model_instance_kind"
          - "model_instance_device_id"
          - "model_repository" : model repository 경로
          - "model_version"
          - "model_name"
        """
        print('Initialized...')
        df = pd.DataFrame(args)  # 적절한 데이터프레임을 생성하거나 로드해야 함
        df = args['dataframe']
        self.psng_predictor = psng_predict_all_v2(df)

    def execute(self, requests):
        """
        'execute' 메소드는 필수적으로 구현되어야 합니다. 매 추론 요청마다 호출됩니다.

        Parameters
        ----------
        requests : list of pb_utils.InferenceRequest
          배치를 구성하는 input data의 list입니다.
          길이는 클라이언트 혹은 dynamic batching에 의해 구성된 배치 사이즈입니다.

        Returns
        -------
        list of pb_utils.InferenceResponse. requests와 길이가 동일해야 합니다.
        """
        responses = []
        for request in requests:
            input_tensors = request.get_input_tensors()
            output_tensors = []

            # 입력 데이터를 추출합니다.
            input_data = input_tensors[0].as_numpy()
            
            # 추론을 수행합니다.
            self.psng_predictor.df = input_data  # 데이터 프레임을 입력으로 설정
            scores = self.psng_predictor.prediction()  # 예측 수행
            
            # 출력 텐서를 생성합니다.
            output_tensor = pb_utils.Tensor("output", scores)
            output_tensors.append(output_tensor)

            # InferenceResponse를 생성하고 response 리스트에 추가합니다.
            response = pb_utils.InferenceResponse(output_tensors=output_tensors)
            responses.append(response)

        return responses

    def finalize(self):
        """
        모델이 Triton 서버에서 unload될 때 한 번 호출됩니다. 반드시 구현할 필요는 없습니다.
        """
        print("Cleaning up...")
