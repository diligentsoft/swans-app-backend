require 'httparty'

Given("access to the app") do

end

When("I submit the details of a fly tipping incident") do
  @payload = JSON.parse(File.read('features/support/files/valid.basic.json'))
  report_flytipping(@payload)
end

When("I submit the details of a fly tipping incident with an image") do
  @payload = JSON.parse(File.read('features/support/files/valid.image.json'))
  report_flytipping(@payload)
end

Then("the council will be notified of the fly tipping incident") do
  expect(@response.code).to eq 200
end

def report_flytipping(payload)
  url =  Settings.swans_app_backend.base_url + Settings.swans_app_backend.flytipping_resource_path
  @response = HTTParty.post(
      URI.parse(URI.escape(url)),
      body: payload.to_json,
      headers: {
          'Content-Type' => 'application/json'
      }
  )
end