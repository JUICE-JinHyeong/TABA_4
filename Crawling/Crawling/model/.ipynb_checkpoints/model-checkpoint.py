import triton_python_backend_utils as pb_utils
from predict_rena_v3 import psng_predict_all_v3

class TritonPythonModel:
    def initialize(self, args):
        print('Initialized...')
    
    def execute(self, requests):
        responses = []
        for request in requests:
            input_tensors = pb_utils.get_input_tensor_by_name(request, "input")
            input_data = pb_utils.tensor_to_ndarray(input_tensors[0])

            # 입력 데이터를 리스트로 변환
            input_data_list = input_data.tolist()

            # psng_predict_all_v3 클래스의 인스턴스 생성
            model = psng_predict_all_v3(input_data_list)

            # 예측 실행
            predictions = model.prediction()

            # 예측 결과를 Triton의 출력 텐서로 변환
            output_tensor = pb_utils.Tensor("output", data=predictions)

            # InferenceResponse 생성
            response = pb_utils.InferenceResponse()
            response.add_output(output_tensor)
            responses.append(response)

        return responses
    
    def finalize(self):
        print("Cleaning up...")
