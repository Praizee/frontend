import { Select } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import { zodValidator } from "@/lib";
import {
	callApi,
	targetCountries,
	validateTagValue,
} from "@/lib/helpers/campaign";
import { useElementList, useWatchFormStatus } from "@/lib/hooks";
import { CrossIcon } from "@/public/assets/icons/campaign";
<<<<<<< HEAD
import { useCampaignStore } from "@/store";
import { type StepOneData, useFormStore } from "@/store/useFormStore";
=======
import { STEP_DATA_KEY_LOOKUP } from "@/store/formStore";
import { useCampaignForm } from "@/store/useCampaignForm";
>>>>>>> 25e901c (refactor)
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { type KeyboardEvent, type MouseEvent, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import FormErrorMessage from "../FormErrorMessage";
import Heading from "../Heading";

function StepOne() {
	const tagInputRef = useRef<HTMLInputElement>(null);

	const {
<<<<<<< HEAD
		currentStep,
		currentCampaign,
		formStepData,
		actions: { goToStep, updateFormData, updateCurrentCampaign },
	} = useFormStore((state) => state);
=======
		values,
		categories,
		actions: { goToStep, updateValues, updateInitialValues },
	} = useCampaignForm((state) => state);

	const currentStep = values.currentStep ?? 1;
>>>>>>> 25e901c (refactor)

	const { categories: campaignCategories } = useCampaignStore((state) => state);

	const { For: TagList } = useElementList();
	const { For: CategoryList } = useElementList();
	const { For: CountryList } = useElementList();

	const {
		control,
		formState,
		handleSubmit,
		getValues,
		reset,
		setValue: setFormValue,
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator("campaignStepOne")!),
<<<<<<< HEAD
		defaultValues: formStepData,
=======
		defaultValues: values,
>>>>>>> 25e901c (refactor)
	});

	useEffect(() => {
		if (!getValues().categoryId) {
			reset(formStepData);
		}
	}, [formStepData]);

	useWatchFormStatus(formState);

<<<<<<< HEAD
	const onSubmit = async (data: StepOneData) => {
		updateFormData(data);

=======
	const onSubmit = async (data: Partial<Campaign>) => {
>>>>>>> 25e901c (refactor)
		const { data: dataInfo, error } = await callApi<Partial<Campaign>>(
			`/campaign/create/one`,
			{
				...data,
<<<<<<< HEAD
				campaignId: currentCampaign._id,
=======
				...(data?.category?._id && { categoryId: data?.category?._id }),
				...(values._id && { campaignId: values._id.toString() }),
>>>>>>> 25e901c (refactor)
			}
		);

		if (error) {
			toast.error(error.status, {
				description: error.message,
			});

			return;
		}

		if (!dataInfo.data) return;
<<<<<<< HEAD

		updateCurrentCampaign(dataInfo.data);
=======
		updateInitialValues(dataInfo.data);
>>>>>>> 25e901c (refactor)
		goToStep(2);
	};

	const handleAddTags = (
		event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
	) => {
		const isEnterKey = (event as KeyboardEvent).key === "Enter";

		if (event.type === "keydown" && !isEnterKey) return;

		if (event.type === "keydown") {
			event.preventDefault();
		}

		const validTag = validateTagValue(
<<<<<<< HEAD
			formStepData.tags,
=======
			values.tags ?? [],
>>>>>>> 25e901c (refactor)
			tagInputRef.current?.value
		);

		if (!validTag) return;

<<<<<<< HEAD
		const newTagState = [...formStepData.tags, `#${validTag}`];

		updateFormData({ tags: newTagState });
=======
		const newTagState = [...(values.tags ?? []), `#${validTag}`];

		updateValues({ tags: newTagState });
>>>>>>> 25e901c (refactor)

		setFormValue("tags", newTagState);

		tagInputRef.current && (tagInputRef.current.value = "");
	};

	const handleRemoveTags = (tag: string) => () => {
<<<<<<< HEAD
		const newTagState = formStepData.tags.filter((tagItem) => tagItem !== tag);

		updateFormData({ tags: newTagState });
=======
		const newTagState =
			values.tags && values.tags.filter((tagItem) => tagItem !== tag);

		updateValues({ tags: newTagState });
>>>>>>> 25e901c (refactor)

		setFormValue("tags", newTagState);
	};

	return (
		<section className="w-full">
			<Heading as="h1" className="text-abeg-primary">
				Create a campaign to fund your passion or cause.
			</Heading>

			<form
				id={`${currentStep}`}
				className="mt-8"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-6">
					<li>
						<label
							htmlFor="categoryId"
							className="text-sm font-semibold lg:text-xl"
						>
							What best describes your fundraiser?
						</label>

						<Controller
							control={control}
							name="categoryId"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-4 h-[50px] rounded-[10px] border-unfocused px-2 text-xs data-[placeholder]:text-placeholder lg:h-[58px]  lg:px-4 lg:text-base"
									>
										<Select.Value placeholder="Select what category best suit your fundraiser" />
									</Select.Trigger>

									<Select.Content>
										<CategoryList
<<<<<<< HEAD
											each={campaignCategories}
=======
											each={categories}
>>>>>>> 25e901c (refactor)
											render={(category) => (
												<Select.Item key={category._id} value={category._id}>
													{category.name}
												</Select.Item>
											)}
										/>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<FormErrorMessage formState={formState} errorField={"category"} />
					</li>

					<li>
						<label
							htmlFor="country"
							className="text-sm font-semibold lg:text-xl"
						>
							What country are you located?
						</label>

						<Controller
							control={control}
							name="country"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-4 h-[50px] rounded-[10px] border-unfocused px-2 text-xs data-[placeholder]:text-placeholder lg:h-[58px] lg:px-4 lg:text-base"
									>
										<Select.Value placeholder="Select your country" />
									</Select.Trigger>

									<Select.Content>
										<CountryList
											each={targetCountries}
											render={(country) => (
												<Select.Item
													key={country}
													value={country.toUpperCase()}
												>
													{country}
												</Select.Item>
											)}
										/>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<FormErrorMessage formState={formState} errorField={"country"} />
					</li>

					<li>
						<label htmlFor="tags" className="text-sm font-semibold lg:text-xl">
							Campaign Tags
						</label>

						<div className="mt-4 flex items-center gap-2">
							<input
								ref={tagInputRef}
								name="tags"
								type="text"
								placeholder="Add hashtags or search keywords to your campaign"
								className="w-full rounded-[10px] border border-unfocused px-2 py-4 text-xs focus-visible:outline-abeg-primary lg:p-4 lg:text-base"
								onKeyDown={handleAddTags}
							/>

							<button
								type="button"
								className="rounded-md border border-abeg-primary px-3 py-2 text-xs font-semibold text-abeg-primary lg:px-[15px] lg:py-4 lg:text-base"
								onClick={handleAddTags}
							>
								Add
							</button>
						</div>

						<div className="mt-4 flex flex-col gap-4">
							<span className="text-xs text-abeg-primary lg:text-sm">
<<<<<<< HEAD
								{formStepData.tags.length}/5 tags
=======
								{values?.tags?.length ?? 0}/5 tags
>>>>>>> 25e901c (refactor)
							</span>

							<ul className="flex flex-wrap gap-2 text-xs font-medium text-abeg-primary lg:text-base">
								<TagList
<<<<<<< HEAD
									each={formStepData.tags}
=======
									each={values?.tags ?? []}
>>>>>>> 25e901c (refactor)
									render={(tag, index) => (
										<li
											key={`${tag}-${index}`}
											className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-abeg-primary bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
										>
											<p>{tag}</p>

											<button
												className="transition-transform duration-100 active:scale-[1.12]"
												type="button"
												onClick={handleRemoveTags(tag)}
											>
												<CrossIcon className="size-2.5" />
											</button>
										</li>
									)}
								/>
							</ul>
						</div>
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepOne;
