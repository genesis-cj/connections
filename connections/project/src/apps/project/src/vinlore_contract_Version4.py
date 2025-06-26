"""
Genesis AI™ x Bolt Hackathon
Module: VinLore™ Blockchain-Based Legacy Access (Algorand Smart Contract)
Purpose: Unlock legacy story capsule upon verified death or condition met
"""

from pyteal import *

# Configurable global keys
LEGACY_CAPSULE_ID = Bytes("capsule_id")         # Encrypted legacy archive ID
TRUSTED_RECIPIENT = Bytes("recipient")          # Trusted account (address)
UNLOCK_TIMESTAMP = Bytes("unlock_time")         # Epoch time after which unlock is allowed
UNLOCKED_FLAG = Bytes("unlocked")               # Boolean state to prevent double access


def approval_program():
    on_creation = Seq([
        App.globalPut(LEGACY_CAPSULE_ID, Txn.application_args[0]),
        App.globalPut(TRUSTED_RECIPIENT, Txn.application_args[1]),
        App.globalPut(UNLOCK_TIMESTAMP, Btoi(Txn.application_args[2])),
        App.globalPut(UNLOCKED_FLAG, Int(0)),
        Return(Int(1))
    ])

    # Trigger unlock: Called by trusted recipient + time must pass
    trigger_unlock = Seq([
        Assert(Global.latest_timestamp() >= App.globalGet(UNLOCK_TIMESTAMP)),
        Assert(Txn.sender() == App.globalGet(TRUSTED_RECIPIENT)),
        Assert(App.globalGet(UNLOCKED_FLAG) == Int(0)),
        App.globalPut(UNLOCKED_FLAG, Int(1)),
        Return(Int(1))
    ])

    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.NoOp, trigger_unlock]
    )
    return program


def clear_program():
    return Return(Int(1))


if __name__ == "__main__":
    with open("vinlore_approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=6)
        f.write(compiled)

    with open("vinlore_clear.teal", "w") as f:
        compiled_clear = compileTeal(clear_program(), mode=Mode.Application, version=6)
        f.write(compiled_clear)