from <%= packagePythonName %> import hello

class TestHello:
    def test_hello(self):
        assert hello("test") == "Hello test from <%= packagePythonName %>!"
