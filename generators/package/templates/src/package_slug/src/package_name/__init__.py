def main() -> None:
    hello("main")

def hello(name) -> str:
    return f"Hello {name} from <%= packagePythonName %>!"
